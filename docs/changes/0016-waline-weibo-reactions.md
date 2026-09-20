# 0016 Waline Weibo Reactions

## Scope

Enable a small set of article reactions in the example Waline configuration.

## Decision

- Use four Weibo emoji assets so article reactions match the comment picker.
- Label the reactions in Chinese as “喜欢”, “开心”, “思考”, and “抱抱”.
- Keep the configured image order and labels stable. Waline stores article-reaction totals by array position, rather than by an image identifier.
- Allow sites to opt out by setting `params.waline.reaction = false`.

## Implementation Notes

- Map the optional `params.waline.locale` reaction labels to Waline's camel-cased locale keys. Hugo normalizes parameter-map keys to lowercase, so serializing the map directly would not produce `reactionTitle` correctly.
- Keep Hugo's contextual JavaScript serialization for the reaction values and labels, so Waline receives strings and arrays with their intended types.
- Pin the Weibo emoji asset URLs to `@waline/emojis@1.1.0`, matching the comment emoji preset already used by the example configuration.

## Testing Notes

- Hugo can validate the example configuration and render the client options without a Waline server.
- A live Waline server is still required to verify that reactions render, persist after reload, and increment correctly.
