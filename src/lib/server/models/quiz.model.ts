import type { QuizItem } from '$lib/entities/Quiz';
import { Repository } from 'redis-om';
import { quizSchema } from './quiz.entity';
import redisClient from '$lib/server/utils/RedisClient';

export class QuizModel {
	#repository: Repository;

	constructor() {
		this.#repository = new Repository(quizSchema, redisClient);
	}

	async getQuizsFromId(id: number): Promise<QuizItem[]> {
		const quizzes = await this.#repository.fetch(`${id}`); // retrived properties can be null if no invader is found
		return [
			{
				question: (quizzes.question1 as string) ?? '',
				options: (quizzes.options1 as string[]) ?? [],
				correctIndex: (quizzes.index1 as number) ?? 0
			},
			{
				question: (quizzes.question2 as string) ?? '',
				options: (quizzes.options2 as string[]) ?? [],
				correctIndex: (quizzes.index2 as number) ?? 0
			},
			{
				question: (quizzes.question3 as string) ?? '',
				options: (quizzes.options3 as string[]) ?? [],
				correctIndex: (quizzes.index3 as number) ?? 0
			},
			{
				question: (quizzes.question4 as string) ?? '',
				options: (quizzes.options4 as string[]) ?? [],
				correctIndex: (quizzes.index4 as number) ?? 0
			}
		];
	}
}
