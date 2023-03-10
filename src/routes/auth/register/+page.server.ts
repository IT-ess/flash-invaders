import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();

	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { firstname, lastname, locale } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		const schema = z.object({
			firstname: z
				.string({
					required_error: 'Firstname is required.'
				})
				.min(3, {
					message: 'Name must be at least 3 characters long.'
				})
				.max(255, {
					message: 'Name must be less than 255 characters long.'
				}),
			lastname: z
				.string({
					required_error: 'Lastname is required.'
				})
				.min(3, {
					message: 'Name must be at least 3 characters long.'
				})
				.max(255, {
					message: 'Name must be less than 255 characters long.'
				}),
			locale: z
				.string({
					required_error: 'Locale is required.'
				})
				.length(2, {
					message: 'Locale must be 2 charcters long.'
				})
				.max(2, {
					message: 'Name must be less than 255 characters long.'
				})
		});

		// Validate the data
		try {
			schema.parse({
				firstname,
				lastname,
				locale
			});
		} catch (err) {
			let message = 'Invalid data.';
			let invalidField: string | number = '';

			if (err instanceof z.ZodError) {
				message = err.errors[0].message;
				invalidField = err.errors[0].path[0];
			}

			return fail(400, {
				message,
				invalidField,
				error: true
			});
		}

		// Create the user
		try {
			const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password: null
				},
				attributes: {
					username: username,
					score: 0,
					progression: 0,
					locale: locale
				}
			});
		} catch (err) {
			if (err instanceof LuciaError) {
				if (err.message === 'AUTH_DUPLICATE_KEY_ID') {
					return fail(400, {
						message: 'Username already in use.',
						invalidField: 'firstname',
						error: true
					});
				}
			}
			return fail(400, {
				message: `An error occurred while creating your account. Message: ${err}`,
				invalidField: '',
				error: true
			});
		}
		// Create the session
		try {
			const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
			const key = await auth.getKey('username', username);

			const session = await auth.createSession(key.userId);

			locals.setSession(session);
		} catch (err) {
			return fail(400, {
				message: 'Invalid credentials.',
				error: true,
				invalidField: ''
			});
		}
		throw redirect(302, '/');
	}
};
