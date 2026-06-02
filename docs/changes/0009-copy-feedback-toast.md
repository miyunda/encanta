# 0009 Copy Feedback Toast

## Scope

Add explicit toast feedback for code-block copy actions.

## Motivation

Button-only state changes are easy to miss during reading. Copy interactions should provide immediate and visible confirmation.

## Decisions

- Keep the inline copy button state change.
- Add a lightweight toast for copy success and failure.
- Use Chinese feedback text because the current site target is primarily Chinese-speaking readers.

## Implementation Notes

- Added a reusable toast helper in `assets/js/main.js`.
- Added toast styling in `assets/css/main.css`.
- Copy actions now trigger:
  - `代码已复制`
  - `复制失败`

## Testing Notes

- Manual browser verification is required to confirm placement and visibility across narrow and wide viewports.

## Follow-ups

- Consider routing future toast strings through an i18n layer if the theme adds multi-language UI text.
