import { Text as TextIcon } from '@strapi/icons';
import { pluginName } from './constants';
import { getTrad } from './utils';

// https://docs.strapi.io/developer-docs/latest/development/custom-fields.html
export const register = (strapiApp) => {
  // register the plugin
  strapiApp.registerPlugin({
    id: pluginName,
    name: pluginName,
  });

  // register the 'canto-media' custom field
  strapiApp.customFields.register({
    name: pluginName, // must correspond with server/register.js
    pluginId: pluginName, // must correspond with server/register.js
    type: 'json', // must correspond with server/register.js
    icon: TextIcon,
    intlLabel: {
      id: getTrad('builder.field.label'),
    },
    intlDescription: {
      id: getTrad('builder.field.description'),
    },
    components: {
      Input: () => import(/* webpackChunkName: "input-component" */ './components/Input'),
    },
  });
};
