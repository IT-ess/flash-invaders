import type { Client, Repository, Schema } from 'redis-om';
import type { Context } from './context.entity';
import type { CarouselItem, ContextType } from '$lib/entities/Context';

export class ContextModel {
	#redis: Client;
	#repository: Repository<Context>;

	constructor(redis: Client, contextSchema: Schema<Context>) {
		this.#redis = redis;
		this.#repository = this.#redis.fetchRepository(contextSchema);
	}

	async getContextFromId(id: number): Promise<ContextType> {
		const context = (await this.#repository.fetch(`${id}`)).toJSON();
		for (let i = 0; i < context.carouselCaptions.length; i++) {
			let carouselItems: CarouselItem[] = [];
			carouselItems.push({
				// not really safe ...
				caption: context.carouselCaptions[i],
				imgurl: context.carouselUrls[i]
			});
			return {
				id: +context.entityId,
				name: context.name,
				carousel: carouselItems
			};
		}
		throw new Error('Context not found');
	}
}
