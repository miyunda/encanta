# 0014 Root-Level Post Permalinks

## Scope

Adjust the example site and example configuration so blog posts resolve at the site root instead of under `/posts/`.

## Motivation

For this project, article URLs should prefer:

- `/article-name/`

instead of:

- `/posts/article-name/`

This better matches the intended site structure and avoids making `/posts/` look like a mandatory theme convention.

## Decisions

- Add a `[permalinks]` example for the `posts` section.
- Use:

```toml
[permalinks]
  posts = "/:slugorcontentbasename/"
```

- Keep `mainSections = ["posts"]` for homepage selection only.

## Implementation Notes

- Updated `hugo.toml.example`.
- Updated `exampleSite/hugo.toml`.
- Clarified that `mainSections` does not control final article URLs.
- Used Hugo 0.162-compatible permalink token syntax.

## Testing Notes

- This is a configuration-level change and does not require template changes.
- Final site behavior still depends on the user's content section being `posts`.

## Follow-ups

- Consider documenting slug strategy more explicitly in the future user-facing theme README.
