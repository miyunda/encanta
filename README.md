# encanta

`encanta` is a personal blog project built around a static-site workflow.

## Goals

- Keep the publishing pipeline static-first and easy to operate.
- Render Markdown content from a Git-based content repository.
- Provide a polished reading experience with adaptive layouts, light/dark themes, rich Markdown rendering, and media support.
- Keep project communication, documentation, and implementation primarily in English.

## Working Principles

- Never commit directly to `main`.
- Use descriptive branch names that reflect the actual change.
- Record design, implementation, and testing decisions in `docs/`.
- Maintain a long-term roadmap in [`docs/roadmap.md`](docs/roadmap.md).
- Keep the main project documentation in English and provide [`README_CN.md`](README_CN.md) for Chinese readers.
- Consider a wiki later if the documentation set grows beyond what the repository structure handles well.

## Repository Layout

```text
.
├── README.md
├── README_CN.md
├── assets/
├── layouts/
├── static/
├── exampleSite/
├── theme.toml
├── hugo.toml.example
├── docs/
│   ├── changes/
│   ├── project-rules.md
│   └── roadmap.md
└── .gitignore
```

## Documentation Conventions

- `docs/roadmap.md`: long-term planning and phased milestones
- `docs/project-rules.md`: collaboration rules, branching policy, and documentation requirements
- `docs/changes/`: dated or numbered change records for notable design and implementation work

## Current Status

This repository now contains the project governance baseline, the initial architecture definition, and the first Hugo theme skeleton at the repository root.

## Planned Distribution

The preferred installation method for `encanta` is Hugo Modules. Git submodules and manual copies remain supported as secondary options.
