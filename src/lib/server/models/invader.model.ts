import type { Client, Repository, Schema } from 'redis-om';
import type { Invader } from './invader.entity';
import { SCAN_RADIUS } from '$env/static/private';
import type { InvaderType } from '$lib/entities/Invader';

export class InvadersModel {
	#redis: Client;
	#repository: Repository<Invader>;

	constructor(redis: Client, invadersSchema: Schema<Invader>) {
		this.#redis = redis;
		this.#repository = this.#redis.fetchRepository(invadersSchema);
		this.#repository.createIndex();
	}

	async getInvaderByLocation(lat: number, long: number): Promise<InvaderType | null> {
		const invader = await this.#repository
			.search()
			.where('location')
			.inRadius((circle) => circle.longitude(long).latitude(lat).radius(+SCAN_RADIUS).meters)
			.return.first();
		if (invader !== null) {
			const json = invader.toJSON();
			return {
				id: +json.entityId,
				name: json.name,
				location: {
					longitude: json.location.longitude,
					latitude: json.location.latitude
				},
				imageUrl: json.imageUrl
			};
		} else {
			return null;
		}
	}

	async getInvaderById(id: number): Promise<InvaderType> {
		const invader = await this.#repository.fetch(`${id}`); // always defined, only params are undefined if not found
		const json = invader.toJSON();
		return {
			id: +json.entityId,
			name: json.name ?? '??',
			location: {
				longitude: json.location.longitude ?? 0,
				latitude: json.location.latitude ?? 0
			},
			imageUrl: json.imageUrl ?? ''
		};
	}
}
