import type { PageLoad } from './$types';

export const load = (() => {
	return {
		header: true,
		nav: true
	};
}) satisfies PageLoad;
