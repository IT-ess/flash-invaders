import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	if (session !== null) {
		const { user } = session;
		if (user) {
			return {
				user
			};
		}
	}
};
