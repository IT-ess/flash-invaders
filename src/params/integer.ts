import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	// ajout ici de la logique "pas + de id = 12"
	return /^\d+$/.test(param);
}) satisfies ParamMatcher;
