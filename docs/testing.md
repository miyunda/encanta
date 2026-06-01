# Testing

## Local Hugo Test on macOS

If your source site lives in a separate repository such as `/Users/yu/Projects/blog-src`, use:

```bash
hugo server --source /Users/yu/Projects/blog-src --themesDir /Users/yu/Projects/blog-app --theme encanta
```

Equivalent relative-path example:

```bash
hugo server --source blog-src --themesDir ../blog-app --theme encanta
```

## What This Assumes

- Hugo is installed locally.
- The source site config enables or accepts `theme = "encanta"`.
- The `encanta` theme directory exists under the `themesDir` path.

## Common Failure Modes

### Shortcode Not Found

If Hugo reports:

```text
template for shortcode "video-js" not found
```

check these first:

- the command includes `--theme encanta`
- the command points `--themesDir` at the repository root that contains `encanta/`
- the theme files exist at `encanta/layouts/shortcodes/`

### Invalid Front Matter Date

If Hugo reports:

```text
the "date" front matter field is not a parsable date
```

fix the source content file to use a valid Hugo date format, for example:

```toml
date = 2026-05-31T18:10:00+08:00
```

or:

```yaml
date: 2026-05-31T18:10:00+08:00
```
