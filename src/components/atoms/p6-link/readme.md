# p6-link

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                                                                                                        | Type                                                      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------- |
| `download` | `download` | This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). Only applies when an `href` is provided. | `string \| undefined`                                     | `undefined` |
| `href`     | `href`     | The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.                                                                                                                                                                                             | `string \| undefined`                                     | `undefined` |
| `rel`      | `rel`      | Sets or retrieves the relationship between the object and the destination of the link. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). Only applies when an `href` is provided.                                                                                 | `string \| undefined`                                     | `undefined` |
| `target`   | `target`   | Sets or retrieves the window or frame at which to target content. Only applies when an `href` is provided.                                                                                                                                                                                                                         | `"_blank" \| "_parent" \| "_self" \| "_top" \| undefined` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
