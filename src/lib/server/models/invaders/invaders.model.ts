import type { Client, Repository, Schema } from 'redis-om';
import type { Invader } from './invader.entity';
import { SCAN_RADIUS } from '$env/static/private';

export class InvadersModel {
	#redis: Client;
	#repository: Repository<Invader>;

	constructor(redis: Client, invadersSchema: Schema<Invader>) {
		this.#redis = redis;
		this.#repository = this.#redis.fetchRepository(invadersSchema);
		this.#repository.createIndex();
	}

	async getInvaderByLocation(lat: number, long: number): Promise<Invader | null> {
		const invader = await this.#repository
			.search()
			.where('location')
			.inRadius((circle) => circle.longitude(long).latitude(lat).radius(+SCAN_RADIUS).meters)
			.return.first();
		if (invader !== null) {
			return invader.toJSON() as Invader;
		} else {
			return null;
		}
	}
}
