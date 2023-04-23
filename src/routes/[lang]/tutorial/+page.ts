import type { PageLoad } from './$types';
import GoToRegistration from './GoToRegistration.svelte';

export const load = (() => {
	return {
		cta: GoToRegistration,
		header: true
	};
}) satisfies PageLoad;
