import { Entity, Schema } from 'redis-om';

export class Invader extends Entity {}

export const invaderSchema = new Schema(Invader, {
	name: { type: 'string' },
	location: { type: 'point' },
	question1: { type: 'string' },
	answers1: { type: 'string[]' },
	solution1: { type: 'number' },
	question2: { type: 'string' },
	answers2: { type: 'string[]' },
	solution2: { type: 'number' },
	question3: { type: 'string' },
	answers3: { type: 'string[]' },
	solution3: { type: 'number' },
	question4: { type: 'string' },
	answers4: { type: 'string[]' },
	solution4: { type: 'number' }
});
