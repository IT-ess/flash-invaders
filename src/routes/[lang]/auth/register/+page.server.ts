import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (session) {
		redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { firstname, lastname, locale } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		const bannedCharacterValidator = (bannedCharacter: string) => (value: string) => {
			if (value.includes(bannedCharacter)) {
				throw new Error(`The character "${bannedCharacter}" is not allowed.`);
			}
			return true;
		};

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
				})
				.refine(bannedCharacterValidator('.'), { message: 'The character "." is not allowed.' })
				.refine(bannedCharacterValidator(','), { message: 'The character "," is not allowed.' }),
			lastname: z
				.string({
					required_error: 'Lastname is required.'
				})
				.min(3, {
					message: 'Name must be at least 3 characters long.'
				})
				.max(255, {
					message: 'Name must be less than 255 characters long.'
				})
				.refine(bannedCharacterValidator('.'), { message: 'The character "." is not allowed.' })
				.refine(bannedCharacterValidator(','), { message: 'The character "," is not allowed.' }),
			locale: z
				.string({
					required_error: 'Locale is required.'
				})
				.length(2, {
					message: 'Locale must be 2 charcters long.'
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
			let message = `Invalid data. ${err}`;
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
			const username = `${firstname.trim().toLowerCase()}.${lastname.trim().toLowerCase()}`;
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password: null
				},
				attributes: {
					username: username,
					score: 0,
					zwt0: 1, // we give the tutorial for free since it's no longer available
					zwt1: 0,
					zwt2: 0,
					zwt3: 0,
					zwt4: 0,
					zwt5: 0,
					zwt6: 0,
					zwt7: 0,
					zwt8: 0,
					zwt9: 0,
					zwt10: 0,
					zwt11: 0,
					locale: locale
				}
			});

			const session = await auth.createSession(user.id);
			auth.createSessionCookie(session);
			// setSessionCookie(session);

			// locals.setSession(session);
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
		redirect(302, `/${locale}/home`);
	}
};
