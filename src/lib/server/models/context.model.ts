import type { Client, Repository, Schema } from 'redis-om';
import type { Context } from './context.entity';
import type { CarouselItem, ContextItem, ContextType } from '$lib/entities/Context';

export class ContextModel {
	#redis: Client;
	#repository: Repository<Context>;

	constructor(redis: Client, contextSchema: Schema<Context>) {
		this.#redis = redis;
		this.#repository = this.#redis.fetchRepository(contextSchema);
	}

	async getContextFromId(id: number): Promise<ContextType> {
		const context = (await this.#repository.fetch(`${id}`)).toJSON();
		let carouselItems: CarouselItem[] = [];
		for (let i = 0; i < context.carouselCaptions.length; i++) {
			carouselItems.push({
				// not really safe ...
				name: context.carouselCaptions[i],
				imgurl: context.carouselUrls[i]
			});
		}
		let contextItems: ContextItem[] = [];
		for (let i = 0; i < context.itemsTypes.length; i++) {
			contextItems.push({
				// not really safe ...
				type: context.itemsTypes[i],
				source: context.itemsSources[i],
				caption: context.itemsCaptions[i] !== '' ? context.itemsCaptions[i] : undefined
			});
		}
		return {
			id: +context.entityId,
			name: context.name,
			carousel: carouselItems,
			items: contextItems
		};
	}
}
