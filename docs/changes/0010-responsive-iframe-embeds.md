# 0010 Responsive Iframe Embeds

## Scope

Add responsive iframe handling for legacy embedded players inside article content.

## Motivation

Existing content already embeds NetEase Cloud Music and AcFun players as raw HTML iframes. Without theme-level enhancement, those embeds keep fixed inline dimensions and destabilize article layout across viewport sizes.

## Decisions

- Preserve legacy raw iframe embeds without requiring content rewrites.
- Enhance iframes client-side inside article content.
- Detect common providers:
  - NetEase Cloud Music
  - AcFun player
  - generic external iframe fallback

## Implementation Notes

- Added iframe enhancement logic in `encanta/assets/js/main.js`.
- Added provider-aware responsive embed styles in `encanta/assets/css/main.css`.
- The script now:
  - wraps article iframes in a theme container
  - removes legacy inline style attributes
  - applies lazy loading
  - normalizes layout by embed type

## Testing Notes

- Manual browser validation is still needed against representative legacy posts with music and video embeds.

## Follow-ups

- Consider a dedicated shortcode for iframe embeds later if stronger content normalization is desired.
