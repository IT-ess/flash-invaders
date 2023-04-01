import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { QuizItem } from '$lib/entities/quiz';
import { api } from '$lib/server/api';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (+params.id > 12) {
		// should be ok since the matcher is restrictive
		throw redirect(307, `/${params.lang}/home`);
	}
	const { user } = await locals.validateUser();
	if (user === null) {
		throw redirect(307, `/${params.lang}/home`);
	}
	return { questions: await getQuizzesFromAuth(user, +params.id, params.lang) };
};

async function getQuizzesFromAuth(
	user: Lucia.UserAttributes,
	id: number,
	lang: string
): Promise<QuizItem[]> {
	const invaderState = user[`zwt${id}` as keyof Lucia.UserAttributes];
	if (!invaderState) {
		throw redirect(307, `/${lang}/home`);
	}
	return getQuizsFromId(id);
}

async function getQuizsFromId(id: number): Promise<QuizItem[]> {
	return api.quizModel.getQuizsFromId(id);
}

export const actions = {
	submitScoreAndReturnHome: async ({ locals, request, params }) => {
		const data = await request.formData();
		const score = data.get('score');
		if (score === null) {
			throw redirect(307, `/${params.lang}/home`);
		}
		const { user } = await locals.validateUser();
		if (user === null) {
			throw redirect(307, '/');
		}
		console.log(score);
		const newScore = +score + (user?.score ?? 0);
		console.log(newScore);
		const updatedUser = await auth.updateUserAttributes(user?.id, { score: newScore });

		await auth.invalidateAllUserSessions(updatedUser.id);
		const session = await auth.createSession(updatedUser.id);
		locals.setSession(session);
		// A 500 error is thrown here but I don't know why.
		throw redirect(307, `/${params.lang}/home`);
	}
} satisfies Actions;
