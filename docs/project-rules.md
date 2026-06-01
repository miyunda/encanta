# Project Rules

## Language

- The repository's primary language is English.
- User-facing Chinese guidance is provided in `README_CN.md`.
- If the documentation surface becomes too large for the repository structure, a wiki may be introduced later.

## Branch Policy

- Direct commits to `main` are forbidden.
- All changes must be developed in topic branches.
- Branch names must describe the change clearly.

Recommended branch prefixes:

- `feat/` for features
- `fix/` for bug fixes
- `docs/` for documentation work
- `chore/` for maintenance tasks

Examples:

- `feat/adaptive-post-grid`
- `feat/rose-pine-theme-switcher`
- `fix/video-shortcode-responsive-layout`
- `docs/initial-architecture-notes`

## Documentation Discipline

Design, implementation, and testing must be documented as work progresses.

Minimum expectations:

- Design decisions belong in `docs/changes/` when they affect architecture, UX, or workflows.
- Major implementation milestones should be recorded in `docs/changes/`.
- Testing notes should be captured whenever behavior is validated manually or automatically.

## Planning

- The long-term roadmap lives in `docs/roadmap.md`.
- Major new work should be checked against the roadmap before implementation starts.

## Change Recording

Use `docs/changes/` to capture notable work. A typical record should include:

- scope
- motivation
- decisions made
- implementation notes
- testing notes
- open follow-ups

## Pull Request Expectations

- A pull request should target `main` from a descriptive topic branch.
- The PR description should summarize scope, testing, and any documentation updates.
- If a change affects behavior but lacks documentation updates, it is incomplete.
