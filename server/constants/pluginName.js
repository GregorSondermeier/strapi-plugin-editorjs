const packageJson = require('../../package.json');

/**
 * contains the normalized(*) "name" property from the plugin's package.json.
 * (*) normalized means that it's all lowercase and without the words "strapi" or "plugin".
 *
 * @type { string }
 */
const pluginName = packageJson.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = {
  pluginName,
};
