# 0012 Modules-First Installation

## Scope

Switch the recommended theme installation method to Hugo Modules and provide a commented configuration template.

## Motivation

Hugo Modules provide a cleaner and more modern installation and upgrade path than Git submodules for most users. A commented configuration example lowers the barrier for first-time theme setup.

## Decisions

- Hugo Modules become the primary recommended installation method.
- Git submodule and manual copy remain supported as secondary options.
- Add a commented `hugo.toml.example` template to the theme root.

## Implementation Notes

- Updated repository documentation to prefer Hugo Modules.
- Updated the distribution note to assume a dedicated `encanta` theme repository path.
- Added `encanta/hugo.toml.example` with commented examples for:
  - module import
  - brand settings
  - homepage sections
  - footer links
  - icons
  - Waline
  - navigation
  - raw HTML rendering for iframe embeds

## Testing Notes

- The example file is static documentation and does not affect runtime behavior directly.

## Follow-ups

- Align future README installation docs with the module-first recommendation.
- Add a dedicated theme README in the theme root when the repo split is finalized.
