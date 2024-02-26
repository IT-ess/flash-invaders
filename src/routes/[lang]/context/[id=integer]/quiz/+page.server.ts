import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { QuizItem } from '$lib/entities/Quiz';
import { api } from '$lib/server/api';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	const params = event.params;
	if (+params.id > 11) {
		// should be ok since the matcher is restrictive
		redirect(307, `/${params.lang}/home`);
	}
	if (!session) {
		redirect(302, '/');
	}
	const { user } = session;
	if (user === null) {
		redirect(307, `/${params.lang}/home`);
	}
	const invaderState = user[`zwt${params.id}` as keyof Lucia.DatabaseUserAttributes];
	switch (invaderState) {
		case 0:
			redirect(307, `/${params.lang}/home`);
		case 1:
			return { questions: getQuizzesFromAuth(user, +params.id, params.lang), user };
		case 2:
			return redirect(307, `/${params.lang}/context/${params.id}`);
		default:
			// Should not happen since the matcher only gives some numbers
			redirect(307, `/${params.lang}/home`);
	}
};

async function getQuizzesFromAuth(
	user: Lucia.DatabaseUserAttributes,
	id: number,
	lang: string
): Promise<QuizItem[]> {
	const invaderState = user[`zwt${id}` as keyof Lucia.DatabaseUserAttributes];
	if (!invaderState) {
		redirect(307, `/${lang}/home`);
	}
	return getQuizsFromId(`${lang.toUpperCase()}${id}`);
}

async function getQuizsFromId(id: string): Promise<QuizItem[]> {
	return api.quizModel.getQuizsFromId(id);
}

export const actions = {
	submitScoreAndReturnHome: async (event) => {
		const { request, params } = event;
		const authRequest = auth.handleRequest(event);
		const session = await authRequest.validate();
		const data = await request.formData();
		const score = data.get('score');
		if (score === null) {
			redirect(307, `/${params.lang}/home`);
		}
		if (!session) {
			redirect(302, '/');
		}
		const { user } = session;
		if (user === null) {
			redirect(307, '/');
		}
		const newScore = +score + (user.score ?? 0);
		await auth.updateUserAttributes(user.id, {
			score: newScore,
			[`zwt${params.id}`]: 2
		});

		// await auth.invalidateAllUserSessions(updatedUser.id);
		// const session = await auth.createSession(updatedUser.id);
		// locals.setSession(session);
		// A 500 error is thrown here but I don't know why.
		redirect(307, `/${params.lang}/context/${params.id}`);
	}
} satisfies Actions;
