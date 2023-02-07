import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

const config: Config = ({
  loaders: [
    {
      locale: 'fr',
      key: 'common',
      loader: async () => (
        await import('./fr/common.json')
      ).default,
    },
    {
      locale: 'fr',
      key: 'home',
      routes: ['/'], // you can use regexes as well!
      loader: async () => (
        await import('./fr/home.json')
      ).default,
    },
    {
      locale: 'de',
      key: 'common',
      loader: async () => (
        await import('./de/common.json')
      ).default,
    },
    {
      locale: 'de',
      key: 'home',
      routes: ['/'],
      loader: async () => (
        await import('./de/home.json')
      ).default,
    },
  ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);