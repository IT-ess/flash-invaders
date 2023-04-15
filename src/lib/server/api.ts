import { contextSchema } from './models/context.entity';
import { ContextModel } from './models/context.model';
import { invaderSchema } from './models/invader.entity';
import { InvadersModel } from './models/invader.model';
import { quizSchema } from './models/quiz.entity';
import { QuizModel } from './models/quiz.model';
import { redisOMClient } from './utils/RedisOMLoader';

type MainInstance = {
	invadersModel: InvadersModel;
	quizModel: QuizModel;
	contextModel: ContextModel;
};

export const api: MainInstance = {
	invadersModel: new InvadersModel(redisOMClient, invaderSchema),
	quizModel: new QuizModel(redisOMClient, quizSchema),
	contextModel: new ContextModel(redisOMClient, contextSchema)
};
