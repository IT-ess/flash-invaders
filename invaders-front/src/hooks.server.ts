// import { auth } from '$lib/server/lucia';
// import { handleHooks } from '@lucia-auth/sveltekit';

// export const handle = handleHooks(auth);

import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { notAuthRoutes } from '$lib/server/routesConfig';

export const handle: Handle = sequence(handleHooks(auth), async ({ event, resolve }) => {
	// Not for security, just to redirect to login page
	if (!event.url.pathname.includes('/auth/') && !notAuthRoutes.includes(event.url.pathname)) {
		const session = await event.locals.validate();
		if (!session) throw redirect(302, '/auth/login');
	}

	return await resolve(event);
});

// je vais sûrement reprendre un truc comme ça en faisant de la validation sur les autorisations présentes dans le cookie.
// idée : un nombre de 10 chiffres qui représente les auth sur les chaque Zwietess : si 0 pas trouvé, si 1 trouvé mais pas rep au questionnaire, si 2 répondu au questionnaire.
// cela représente plutôt des états sur chaque Zwietess.
