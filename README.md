# strapi-plugin-editorjs

A Strapi v4 compatible plugin that provides a custom field for Editor.js rich text content.

To use, add these lines to your model schema:

```json
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

## Documentation

https://editorjs.io/
