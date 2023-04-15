import { Repository, type Point } from 'redis-om';
import { SCAN_RADIUS } from '$env/static/private';
import type { InvaderType } from '$lib/entities/Invader';
import redisClient from '$lib/server/utils/RedisClient';
import { invaderSchema } from './invader.entity';
import { EntityId } from 'redis-om';

export class InvadersModel {
	#repository: Repository;

	constructor() {
		this.#repository = new Repository(invaderSchema, redisClient);
		this.#repository.createIndex();
	}

	async getInvaderByLocation(lat: number, long: number): Promise<InvaderType | null> {
		const invader = await this.#repository
			.search()
			.where('location')
			.inRadius((circle) => circle.longitude(long).latitude(lat).radius(+SCAN_RADIUS).meters)
			.return.first();

		if (invader !== null && invader !== undefined) {
			const id = invader[EntityId] ?? 0;
			const location = (invader.location as Point) ?? { longitude: 0, latitude: 0 };
			return {
				id: +id,
				name: invader.name as string,
				location: {
					longitude: location.longitude,
					latitude: location.latitude
				},
				imageUrl: invader.imageUrl as string
			};
		} else {
			return null;
		}
	}

	async getInvaderById(id: number): Promise<InvaderType | null> {
		const invader = await this.#repository.fetch(`${id}`);
		if (invader !== null) {
			return {
				id: invader?.entityId as number,
				name: invader.name as string,
				location: {
					longitude: /*invader.location?.longitude as number*/ 10,
					latitude: /*invader.location?.latitude as number*/ 10
				},
				imageUrl: invader.imageUrl as string
			};
		} else {
			return null;
		}
	}
}
