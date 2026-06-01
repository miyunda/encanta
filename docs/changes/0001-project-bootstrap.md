# 0001 Project Bootstrap

## Scope

Initialize the `encanta` project with repository rules, roadmap, and baseline documentation.

## Motivation

The project needs explicit discipline from the start so later design and implementation work is traceable and reviewable.

## Decisions

- The project name is `encanta`.
- `main` is protected by policy: no direct commits.
- Branch names must describe the work being done.
- Documentation is mandatory across design, implementation, and testing.
- The repository's primary language is English.
- `README_CN.md` is maintained for Chinese users.
- A wiki is optional and deferred until the documentation set justifies it.

## Implementation Notes

- Initialized a Git repository with `main` as the default branch.
- Added baseline documentation files:
  - `README.md`
  - `README_CN.md`
  - `docs/project-rules.md`
  - `docs/roadmap.md`

## Testing Notes

- Verified that the repository initializes with a `main` branch.
- Verified that the documentation structure exists in the working tree.

## Follow-ups

- Create the first implementation branch before adding site scaffolding.
- Write the initial architecture note for Hugo structure and theme strategy.
