import { main } from '$lib/server/api';
import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';

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
				return {
					type: 'success',
					status: 200,
					data: invader,
					success: true
				};
			} else {
				return {
					type: 'failure',
					status: 404,
					data: {
						message: 'No invader found'
					},
					success: false
				};
			}
		} else {
			return {
				type: 'error',
				status: 400,
				error: {
					message: 'Bad request'
				},
				success: false
			};
		}
	}
} satisfies Actions;
