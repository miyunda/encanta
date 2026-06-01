# 0011 Waline Integration

## Scope

Integrate Waline comments into article pages using public client-side configuration from the Hugo site config.

## Motivation

Comments are part of the article reading flow and were already part of the project scope. The theme should support Waline without embedding private credentials.

## Decisions

- Only load Waline on article pages.
- Only require public configuration under `params.waline`.
- Use Waline's official CDN client integration path.
- Keep private server-side credentials outside the theme and Hugo config.

## Implementation Notes

- Added conditional Waline stylesheet loading in `encanta/layouts/_default/baseof.html`.
- Added a `comments.html` partial with Waline initialization.
- Mounted comments below previous/next article navigation in article pages.
- Added theme-aligned Waline CSS variable overrides in `encanta/assets/css/main.css`.

## Testing Notes

- The integration requires `params.waline.enable = true` and a valid `params.waline.serverURL`.
- Manual browser verification is required with a live Waline server.

## Follow-ups

- Consider optional per-page comment disabling later.
- Consider styling refinements after first live verification.
