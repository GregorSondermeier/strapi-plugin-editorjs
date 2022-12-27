const { pluginName } = require('./constants/pluginName');

module.exports = ({ strapi }) => {
  // https://docs.strapi.io/developer-docs/latest/development/custom-fields.html
  strapi.customFields.register({
    name: pluginName, // must correspond with admin/src/register.js
    plugin: pluginName, // must correspond with admin/src/register.js
    type: 'json', // must correspond with admin/src/register.js
  });
};
