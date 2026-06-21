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

## Header Navigation Configuration

The header ships with four built-in items:

- `posts` -> `Articles`
- `tags` -> `Tags`
- `categories` -> `Categories`
- `about` -> `About`

You do not need to restate them in `hugo.toml`. Use `[menu.main]` only when you want to:

- add an extra link such as an external microblog
- override a built-in item by reusing the same `identifier`

Example:

```toml
[menu]
  [[menu.main]]
    identifier = "bb"
    name = "BB"
    url = "https://bb.example.com/"
    weight = 5

  [[menu.main]]
    identifier = "posts"
    name = "Articles"
    url = "/posts/"
    weight = 10
```

## Planned Distribution

The preferred installation method for `encanta` is Hugo Modules. Git submodules and manual copies remain supported as secondary options.

## Module Update Workflow

If a site installs `encanta` through Hugo Modules, merging changes into `encanta/main` does not automatically update that site on the next deploy. The consuming site keeps using the theme revision pinned in its own `go.mod` and `go.sum` until it explicitly updates the dependency.

Typical rollout flow:

1. Merge the theme change into `encanta/main`.
2. In the consuming site repository, update the module version:

```bash
hugo mod get -u github.com/miyunda/encanta
```

3. Review and commit the resulting `go.mod` and `go.sum` changes.
4. Deploy the consuming site after that commit lands on its production branch.

This version pinning is intentional. It keeps site builds reproducible and prevents unrelated theme changes from appearing in production without an explicit upgrade.
