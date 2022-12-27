# strapi-plugin-editorjs

A Strapi v4 compatible plugin that provides a custom field for Editor.js rich text content.

To use, add these lines to your model schema:

```
{
  // ...
  "attributes": {
    // ...
    "<attributeName>": {
      "type": "customField",
      "customField": "plugin::editorjs.editorjs"
    }
  }
}
```

## Enabling/Disabling

The plugin can be enabled/disabled in the
[plugins.js](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.html)
configuration file of your Strapi project.

```js
// ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  
  editorjs: {
    enabled: true // or false
  },
  
  // ...
});
```

## Configuration

Currently, this plugin can not be configured.

## Documentation

https://editorjs.io/
