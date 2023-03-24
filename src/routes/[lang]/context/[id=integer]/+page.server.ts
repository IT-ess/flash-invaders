import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (+params.id > 12) {
		// should be ok since the matcher is restrictive
		throw redirect(307, '/fr/home'); // TODO : I must adapt this to the language of the user. Maybe it's better to move this at layout level to avoid reloading ?
		// Idea : move gallery, context and quiz to a subfolder reachable with a valid id. Then, I can use the same redirect for all of them.
	}
	const { user } = await locals.validateUser();
	if (user === null) {
		throw redirect(307, '/fr/home');
	}
	return;
};
