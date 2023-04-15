import { Schema } from 'redis-om';

export const quizSchema = new Schema('Quiz', {
	question1: { type: 'string' },
	options1: { type: 'string[]' },
	index1: { type: 'number' },
	question2: { type: 'string' },
	options2: { type: 'string[]' },
	index2: { type: 'number' },
	question3: { type: 'string' },
	options3: { type: 'string[]' },
	index3: { type: 'number' },
	question4: { type: 'string' },
	options4: { type: 'string[]' },
	index4: { type: 'number' }
});
