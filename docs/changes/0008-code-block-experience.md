# 0008 Code Block Experience

## Scope

Upgrade article code blocks to match the theme visual system and add reader-focused interactions.

## Motivation

Default Hugo/Chroma output is functional but not integrated with the theme. The reading experience needs:

- colors that fit the site
- an obvious copy action
- a clearer language label
- automatic collapsing for very long code samples

## Decisions

- Enhance code blocks on the client side rather than requiring content changes.
- Support both Chroma-highlighted blocks and plain fenced code blocks.
- Add a toolbar with:
  - language label
  - copy button
  - expand/collapse button for long blocks
- Use a dedicated code-surface palette aligned with the overall Rosé Pine direction.

## Implementation Notes

- Added JavaScript enhancement for article code blocks in `assets/js/main.js`.
- Added theme-aligned code block styling in `assets/css/main.css`.
- Long code blocks now auto-collapse when they exceed the current line threshold.

## Testing Notes

- The enhancement is designed to work with Hugo/Chroma output already present in article pages.
- Manual browser validation is still needed to tune spacing, overlay fade, and copy interaction copy states.

## Follow-ups

- Consider configurable collapse thresholds later.
- Consider line-number support if the content set benefits from it.
