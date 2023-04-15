import type { QuizItem } from '$lib/entities/Quiz';
import type { Client, Repository, Schema } from 'redis-om';
import type { Quiz } from './quiz.entity';

export class QuizModel {
	#redis: Client;
	#repository: Repository<Quiz>;

	constructor(redis: Client, quizSchema: Schema<Quiz>) {
		this.#redis = redis;
		this.#repository = this.#redis.fetchRepository(quizSchema);
	}

	async getQuizsFromId(id: number): Promise<QuizItem[]> {
		const quizzes = (await this.#repository.fetch(`${id}`)).toJSON(); // retrived properties can be null if no invader is found
		return [
			{
				question: quizzes.question1,
				options: quizzes.options1,
				correctIndex: quizzes.index1
			},
			{
				question: quizzes.question2,
				options: quizzes.options2,
				correctIndex: quizzes.index2
			},
			{
				question: quizzes.question3,
				options: quizzes.options3,
				correctIndex: quizzes.index3
			},
			{
				question: quizzes.question4,
				options: quizzes.options4,
				correctIndex: quizzes.index4
			}
		];
	}
}
