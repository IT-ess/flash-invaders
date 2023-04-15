import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
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
			return { answered: false, user };
		case 2:
			return { answered: true, user };
		default:
			// Should not happen since the matcher only gives some numbers
			throw redirect(307, `/${params.lang}/home`);
	}
};
