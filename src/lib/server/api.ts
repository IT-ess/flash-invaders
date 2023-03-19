import { invaderSchema } from './models/invaders/invader.entity';
import { InvadersModel } from './models/invaders/invaders.model';
import { quizSchema } from './models/invaders/quiz.entity';
import { QuizModel } from './models/invaders/quiz.model';
import { getRedisOMClient } from './utils/RedisOMLoader';

type MainInstance = {
	invadersModel: InvadersModel;
	quizModel: QuizModel;
};

export async function main(): Promise<MainInstance> {
	const redisOM = await getRedisOMClient();

	// Create Models
	const invadersModel = new InvadersModel(redisOM, invaderSchema);
	const quizModel = new QuizModel(redisOM, quizSchema);

	return { invadersModel: invadersModel, quizModel: quizModel };
}

// use handlers instead
