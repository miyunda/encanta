# 0005 Theme Directory Layout

## Scope

Reorganize the repository so Hugo can load `encanta` as a standard theme from a `themesDir`.

## Motivation

The first local render attempt failed to resolve shortcodes because Hugo was pointed at `../blog-app` as a themes directory while the actual theme files were stored at the repository root. Hugo expects a theme named `encanta` to live under a matching subdirectory.

## Decisions

- The actual loadable Hugo theme lives under `encanta/`.
- Theme runtime files move under:
  - `encanta/layouts/`
  - `encanta/assets/`
  - `encanta/exampleSite/`
  - `encanta/theme.toml`
- Repository-level documentation remains at the root.

## Implementation Notes

- Moved the theme skeleton into `encanta/`.
- Kept planning and governance documents at the repository root.
- This layout supports the command:

```bash
hugo server --source blog-src --themesDir ../blog-app --theme encanta
```

## Testing Notes

- This change addresses Hugo's theme discovery rules for `--themesDir`.
- A successful local render still depends on valid content front matter in the source site.

## Follow-ups

- Fix invalid front matter in the source site where needed.
- Add a troubleshooting note for shortcode lookup and test commands.
