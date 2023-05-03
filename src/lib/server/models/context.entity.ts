import { Schema, Entity } from 'redis-om';

export class Context extends Entity {}

export const contextSchema = new Schema(Context, {
	name: { type: 'string' },
	carouselCaptions: { type: 'string[]' },
	carouselUrls: { type: 'string[]' },
	itemsTypes: { type: 'string[]' },
	itemsSources: { type: 'string[]' },
	itemsCaptions: { type: 'string[]' }
});
