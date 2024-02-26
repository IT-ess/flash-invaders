import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ContextType } from '$lib/entities/Context';
import { api } from '$lib/server/api';
import { auth } from '$lib/server/lucia';

export const load = (async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	const params = event.params;
	if (!session) {
		redirect(302, '/');
	}
	if (+params.id > 11) {
		// should be ok since the matcher is restrictive
		redirect(307, `/${params.lang}/home`);
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
			return {
				answered: false,
				user,
				context: getContextFromAuth(user, +params.id, params.lang)
			};
		case 2:
			return {
				answered: true,
				user,
				context: getContextFromAuth(user, +params.id, params.lang)
			};
		default:
			// Should not happen since the matcher only gives some numbers
			redirect(307, `/${params.lang}/home`);
	}
}) satisfies PageServerLoad;

async function getContextFromAuth(
	user: Lucia.DatabaseUserAttributes,
	id: number,
	lang: string
): Promise<ContextType> {
	const invaderState = user[`zwt${id}` as keyof Lucia.DatabaseUserAttributes];
	if (!invaderState) {
		redirect(307, `/${lang}/home`);
	}
	return getContextFromId(id);
}

async function getContextFromId(id: number): Promise<ContextType> {
	return api.contextModel.getContextFromId(id);
}
