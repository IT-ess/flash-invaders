import { InvadersModel } from './models/invaders.model';
import { QuizModel } from './models/quiz.model';

type MainInstance = {
	invadersModel: InvadersModel;
	quizModel: QuizModel;
};

export const api: MainInstance = {
	invadersModel: new InvadersModel(),
	quizModel: new QuizModel()
};
