import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ContextType } from '$lib/entities/Context';
import { api } from '$lib/server/api';

export const load = (async ({ locals, params }) => {
	if (+params.id > 11) {
		// should be ok since the matcher is restrictive
		throw redirect(307, `/${params.lang}/home`);
	}
	const { user } = await locals.validateUser();
	if (user === null) {
		throw redirect(307, `/${params.lang}/home`);
	}
	const invaderState = user[`zwt${params.id}` as keyof Lucia.UserAttributes];
	switch (invaderState) {
		case 0:
			throw redirect(307, `/${params.lang}/home`);
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
			throw redirect(307, `/${params.lang}/home`);
	}
}) satisfies PageServerLoad;

async function getContextFromAuth(
	user: Lucia.UserAttributes,
	id: number,
	lang: string
): Promise<ContextType> {
	const invaderState = user[`zwt${id}` as keyof Lucia.UserAttributes];
	if (!invaderState) {
		throw redirect(307, `/${lang}/home`);
	}
	return getContextFromId(id);
}

async function getContextFromId(id: number): Promise<ContextType> {
	return api.contextModel.getContextFromId(id);
}
