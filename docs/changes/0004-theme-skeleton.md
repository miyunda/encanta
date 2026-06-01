# 0004 Theme Skeleton

## Scope

Create the first runnable Hugo theme skeleton for `encanta`.

## Motivation

The architecture and distribution model are defined. The next step is to turn them into a concrete theme structure that can be previewed locally once Hugo is available.

## Decisions

- Build the theme as a standard Hugo theme layout from the start.
- Provide an `exampleSite/` for configuration and sample content.
- Start with a minimal but coherent skeleton:
  - base layout
  - list page
  - single page
  - header and footer partials
  - post card partial
  - theme initialization script
  - Rosé Pine Dawn / Rosé Pine tokenized CSS
  - theme switcher JavaScript
  - `music` and `video-js` shortcodes

## Implementation Notes

- Added `theme.toml`.
- Added theme templates under `layouts/`.
- Added CSS and JavaScript assets under `assets/`.
- Added `exampleSite/` with:
  - `hugo.toml`
  - an About section
  - a sample post using `<!-- more -->`
- Added starter shortcodes compatible with the current media conventions.
- After initial testing feedback, the theme files were moved under `encanta/` so Hugo can load them through `--themesDir ../blog-app --theme encanta`.

## Testing Notes

- Verified the repository structure against standard Hugo theme conventions.
- Could not run `hugo` locally because the executable is not installed in the current environment.

## Follow-ups

- Install Hugo locally and run the example site.
- Add taxonomy templates and archive/list coverage.
- Add Waline integration, reading progress, math, Mermaid, and responsive iframe helpers.
