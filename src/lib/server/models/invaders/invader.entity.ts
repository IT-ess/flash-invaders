import { Entity, Schema } from 'redis-om';

export class Invader extends Entity {}

export const invaderSchema = new Schema(Invader, {
	name: { type: 'string' },
	location: { type: 'point' }
});
