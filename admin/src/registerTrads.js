import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { pluginName } from './constants';

// https://docs.strapi.io/developer-docs/latest/development/custom-fields.html
export const registerTrads = async ({ locales }) => {
  const importedTrads = await Promise.all(
    locales.map((locale) =>
      import(/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`)
        .then(({ default: data }) => ({
          data: prefixPluginTranslations(data, pluginName),
          locale,
        }))
        .catch(() => ({
          data: {},
          locale,
        })),
    ),
  );

  return Promise.resolve(importedTrads);
};
