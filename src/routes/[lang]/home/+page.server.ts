import { api } from '$lib/server/api';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { fail, error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	if (!session) {
		redirect(302, '/');
	}
	const { user } = session;
	if (user) {
		return {
			user,
			nav: true,
			header: true
		};
	}
};

export const actions = {
	searchInvader: async (event) => {
		const { request } = event;
		const data = await request.formData();
		const lat = data.get('lat');
		const long = data.get('long');

		const authRequest = auth.handleRequest(event);
		const session = await authRequest.validate();
		if (!session) {
			redirect(302, '/');
		}
		const { user } = session;
		if (user === null) {
			error(401, { message: 'Unauthorized' });
		}
		if (lat && long) {
			const invader = await api.invadersModel.getInvaderByLocation(+lat, +long).catch((err) => {
				error(500, { message: err.message });
			});
			if (invader !== null) {
				const invaderState = user[`zwt${invader.id}` as keyof Lucia.DatabaseUserAttributes];
				switch (invaderState) {
					case 0: {
						await auth.updateUserAttributes(user.id, {
							[`zwt${invader.id}`]: 1
						});
						// await auth.invalidateAllUserSessions(updatedUser.id);
						// const session = await auth.createSession(updatedUser.id);
						// locals.setSession(session);
						return invader;
					}
					case 1:
					case 2: {
						return invader;
					}
					default: {
						error(500, { message: 'Something went wrong' });
					}
				}
			} else {
				return fail(404, { message: 'Not found' });
			}
		} else {
			return fail(400, { lat, long, missing: true });
		}
	}
} satisfies Actions;
