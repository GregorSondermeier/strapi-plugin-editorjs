import { pluginName } from '../constants';

/**
 * prefixes the translationKey with the pluginId to achieve uniqueness across the whole of strapi.
 * e.g. "builder.field.label" becomes "editorjs.builder.field.label".
 *
 * @param { string } translationKey
 * @return { string }
 */
export const getTrad = (translationKey) => `${pluginName}.${translationKey}`;
