# 0013 Repository Root Theme Layout

## Scope

Promote the nested theme files into the repository root and remove the redundant `encanta/` wrapper directory.

## Motivation

The repository had drifted into a half-migrated state where the real theme files lived under `encanta/`, while empty placeholder directories also existed at the repository root. That structure was confusing for contributors and inconsistent with standard Hugo theme repositories such as FixIt.

## Decisions

- The repository root is the Hugo theme root.
- Theme runtime files now live directly under:
  - `assets/`
  - `layouts/`
  - `exampleSite/`
  - `theme.toml`
  - `hugo.toml.example`
- Project documentation remains at the repository root under `docs/`.

## Implementation Notes

- Moved theme source files from `encanta/` into the repository root.
- Removed the redundant nested theme directory.
- Updated README files, testing notes, and change records to match the new structure.

## Testing Notes

- The file move is structural and does not change theme behavior by itself.
- Local `--themesDir` testing now assumes the local clone directory is itself named `encanta`, or that Hugo Modules are used instead.

## Follow-ups

- Consider renaming the local clone directory from `blog-app` to `encanta` for more natural `--themesDir` testing.
- Add a root-level theme README when user-facing installation docs are expanded.
