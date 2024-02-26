import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const POST: RequestHandler = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (!session) {
		redirect(302, '/');
	}

	await auth.deleteUser(session.userId);
	auth.invalidateSession(session)

	redirect(302, '/');
};
