import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { notAuthRoutes } from '$lib/server/routesConfig';

export const handle: Handle = sequence(
	handleHooks(auth),
	async ({ event, resolve }) => {
		// Not for security, just to redirect to login page
		if (
			!event.url.pathname.includes('/auth/') &&
			!event.url.pathname.includes('/tutorial') &&
			!notAuthRoutes.includes(event.url.pathname)
		) {
			const session = await event.locals.validate();
			if (!session) throw redirect(302, '/');
		}

		return await resolve(event);
	},
	({ event, resolve }) => {
		const lang = event.url.pathname.startsWith('/de') ? 'de' : 'fr';
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', lang)
		});
	}
);
