# 0015 Default And Extendable Header Menu

## Context

The header navigation originally rendered only `site.Menus.main`.
That forced users to restate all built-in links in their site config, otherwise the theme defaults disappeared.

## Decision

Keep four built-in header items in the theme:

- `posts`
- `tags`
- `categories`
- `about`

Then merge user-defined `menu.main` entries on top:

- a matching `identifier` overrides the built-in item
- a new `identifier` appends a custom item

## Result

Users can keep the default theme navigation without copying it into `hugo.toml`, while still adding custom links such as a standalone "BB" or "哔哔" entry.
