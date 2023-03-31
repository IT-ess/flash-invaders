import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

const config: Config = {
	loaders: [
		{
			locale: 'fr',
			key: 'common',
			loader: async () => (await import('./fr/common.json')).default
		},
		{
			locale: 'fr',
			key: 'home',
			routes: ['/fr/home'], // you can use regexes as well!
			loader: async () => (await import('./fr/home.json')).default
		},
		{
			locale: 'fr',
			key: 'auth',
			routes: ['/auth/register'],
			loader: async () => (await import('./fr/auth.json')).default
		},
		{
			locale: 'fr',
			key: 'context',
			routes: [/\/fr\/context\/\d+/],
			loader: async () => (await import('./fr/context.json')).default
		},
		{
			locale: 'de',
			key: 'common',
			loader: async () => (await import('./de/common.json')).default
		},
		{
			locale: 'de',
			key: 'home',
			routes: ['/de/home'],
			loader: async () => (await import('./de/home.json')).default
		},
		{
			locale: 'de',
			key: 'auth',
			routes: ['/auth/register'],
			loader: async () => (await import('./de/auth.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
