# 0005 Theme Directory Layout

## Scope

Reorganize the repository so the repository root itself is the standard `encanta` theme root.

## Motivation

The repository had drifted into an awkward nested layout. A standard Hugo theme repository should expose theme files directly at the repository root.

## Decisions

- The repository root is the actual loadable Hugo theme root.
- Theme runtime files live under:
  - `layouts/`
  - `assets/`
  - `exampleSite/`
  - `theme.toml`
- Repository-level documentation remains at the root.

## Implementation Notes

- Promoted the nested theme files into the repository root.
- Kept planning and governance documents at the repository root.
- This layout matches common Hugo theme repositories such as FixIt.

## Testing Notes

- This change addresses Hugo Modules distribution and standard theme repository layout expectations.
- A successful local render still depends on valid content front matter in the source site.

## Follow-ups

- Fix invalid front matter in the source site where needed.
- Add a troubleshooting note for shortcode lookup and test commands.
