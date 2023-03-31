import { main } from '$lib/server/api';
import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';

export const actions = {
	searchInvader: async ({ locals, request }) => {
		const data = await request.formData();
		const lat = data.get('lat');
		const long = data.get('long');
		if (lat && long) {
			const api = await main();
			const invader = await api.invadersModel.getInvaderByLocation(+lat, +long);
			if (invader !== null) {
				const { user } = await locals.validateUser();
				if (user !== null && user[`zwt${invader.id}` as keyof Lucia.UserAttributes] === 0) {
					// handle logic when user has already found the invader ?
					const updatedUser = await auth.updateUserAttributes(user.id, {
						[`zwt${invader.id}`]: +1
					});
					await auth.invalidateAllUserSessions(updatedUser.id);
					const session = await auth.createSession(updatedUser.id);
					locals.setSession(session);
				}
				return invader;
			} else {
				return fail(404, { message: 'Not found' });
			}
		} else {
			return fail(400, { lat, long, missing: true });
		}
	}
} satisfies Actions;
