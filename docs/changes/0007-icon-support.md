# 0007 Icon Support

## Scope

Add configurable favicon and related icon support to the theme head template.

## Motivation

The theme should support site identity assets such as favicons and touch icons without requiring hard-coded branding in templates.

## Decisions

- Add icon configuration under `params.icons`.
- Support these paths:
  - `favicon`
  - `favicon32`
  - `appleTouch`
  - `manifest`
- Provide standard fallback paths:
  - `/favicon.ico`
  - `/favicon-32x32.png`
  - `/apple-touch-icon.png`
  - `/site.webmanifest`

## Implementation Notes

- Updated the head template to emit icon-related `<link>` tags.
- Added example icon configuration to `encanta/exampleSite/hugo.toml`.

## Testing Notes

- Sites can now provide icons either by using the default file names in `static/` or by overriding the paths in configuration.

## Follow-ups

- Consider adding optional support for Safari pinned tabs and Windows tile metadata later.
