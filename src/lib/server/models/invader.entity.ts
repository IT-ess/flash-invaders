import { Schema } from 'redis-om';

export const invaderSchema = new Schema('Invader', {
	name: { type: 'string' },
	location: { type: 'point' },
	imageUrl: { type: 'string' }
});
