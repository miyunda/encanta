# Testing

## Local Hugo Test on macOS

If your source site lives in a separate repository such as `/Users/yu/Projects/blog-src`, the preferred approach is Hugo Modules. Add the module import in the source site's `hugo.toml`, then run:

```bash
hugo server --source /Users/yu/Projects/blog-src
```

If you still want to test through `--themesDir`, the parent directory passed to `--themesDir` must contain a folder literally named `encanta/`. That means your local clone directory should also be named `encanta`.

Example when the local theme clone path is `/Users/yu/Projects/encanta`:

```bash
hugo server --source /Users/yu/Projects/blog-src --themesDir /Users/yu/Projects --theme encanta
```

## What This Assumes

- Hugo is installed locally.
- The source site config imports or enables `encanta`.
- If using `--themesDir`, the `encanta` theme directory exists directly under the `themesDir` path.

## Common Failure Modes

### Shortcode Not Found

If Hugo reports:

```text
template for shortcode "video-js" not found
```

check these first:

- the command includes `--theme encanta`
- the command points `--themesDir` at the parent directory that contains `encanta/`
- the theme files exist at `layouts/shortcodes/` inside the theme root

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

## Waline Configuration Regression

With Hugo and Node.js installed, run from the theme repository:

```bash
node tests/waline-config.mjs
```

For a Hugo binary outside `PATH`:

```bash
HUGO_BIN=/path/to/hugo node tests/waline-config.mjs
```

The test builds temporary example sites and evaluates the generated initialization
script with a stubbed Waline `init`. It checks default/custom option types and
values, safe JavaScript escaping, and disabled/missing-server behavior. It does
not contact a Waline server or submit comments. For live verification, open an
article as a logged-out visitor and confirm the editor and submit button appear;
check browser console/network errors if they do not.
