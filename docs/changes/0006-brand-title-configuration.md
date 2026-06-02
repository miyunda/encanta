# 0006 Brand Title Configuration

## Scope

Allow the theme to use different title strings for the browser title, header brand text, and footer default copyright text.

## Motivation

Using a single `site.Title` everywhere is too rigid. A blog may want a concise browser title, a different visible brand label in the header, or a different footer naming convention.

## Decisions

- Keep Hugo's native `title` as the baseline fallback.
- Add optional theme-level brand parameters under `params.brand`:
  - `headerTitle`
  - `browserTitle`
  - `footerTitle`
- If a brand parameter is absent, the theme falls back to `site.Title`.

## Implementation Notes

- Updated the base template to read `params.brand.browserTitle`.
- Updated the header partial to read `params.brand.headerTitle`.
- Updated the footer partial to read `params.brand.footerTitle`.
- Added example values to `exampleSite/hugo.toml`.

## Testing Notes

- The change is backward compatible because all new fields are optional.
- Existing sites that only define `title` should continue to render normally.

## Follow-ups

- Document the full theme configuration surface in the future theme README.
