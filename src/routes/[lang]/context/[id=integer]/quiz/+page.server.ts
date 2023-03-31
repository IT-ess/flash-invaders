import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { QuizItem } from '$lib/entities/quiz';
import { main } from '$lib/server/api';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (+params.id > 12) {
		// should be ok since the matcher is restrictive
		throw redirect(307, '/fr/home'); // TODO : I must adapt this to the language of the user. Maybe it's better to move this at layout level to avoid reloading ?
	}
	const { user } = await locals.validateUser();
	if (user === null) {
		throw redirect(307, '/fr/home');
	}
	return { questions: await getQuizzesFromAuth(user, +params.id) };
};

async function getQuizzesFromAuth(user: Lucia.UserAttributes, id: number): Promise<QuizItem[]> {
	const invaderState = user[`zwt${id}` as keyof Lucia.UserAttributes];
	if (!invaderState) {
		throw redirect(307, '/fr/home');
	}
	return getQuizsFromId(id);
}

async function getQuizsFromId(id: number): Promise<QuizItem[]> {
	const api = await main();
	return api.quizModel.getQuizsFromId(id); // TODO : Handle error when no Invader is found (when the props are null)
}

export const actions = {
	submitScoreAndReturnHome: async ({ locals, request }) => {
		const data = await request.formData();
		const score = data.get('score');
		if (score === null) {
			throw redirect(307, '/fr/home');
		}
		const { user } = await locals.validateUser();
		if (user === null) {
			throw redirect(307, '/');
		}
		const newScore = +score + (user?.score ?? 0);
		await auth.updateUserAttributes(user?.id, { score: newScore });

		throw redirect(307, '/fr/home');
	}
} satisfies Actions;
