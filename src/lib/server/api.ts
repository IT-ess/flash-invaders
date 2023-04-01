import { invaderSchema } from './models/invaders/invader.entity';
import { InvadersModel } from './models/invaders/invaders.model';
import { quizSchema } from './models/invaders/quiz.entity';
import { QuizModel } from './models/invaders/quiz.model';
import { redisOMClient } from './utils/RedisOMLoader';

type MainInstance = {
	invadersModel: InvadersModel;
	quizModel: QuizModel;
};

export const api: MainInstance = {
	invadersModel: new InvadersModel(redisOMClient, invaderSchema),
	quizModel: new QuizModel(redisOMClient, quizSchema)
};
