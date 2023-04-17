import { loadTranslations } from '$lib/translations/translations';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, params }) => {
	const { pathname } = url;
	const defaultLocale = 'fr'; // get from cookie, user session, ...
	const initLocale = params.lang || defaultLocale; // set default if no locale already set, I use directly path params rather than the global 'locale' store. I must provide some validation here.
	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	return {};
};
