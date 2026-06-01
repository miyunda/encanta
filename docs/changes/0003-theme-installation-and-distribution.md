# 0003 Theme Installation and Distribution

## Scope

Define how the `encanta` Hugo theme will be packaged, installed, configured, and upgraded by end users.

## Motivation

Before building templates and assets, the project needs a clear delivery model. The installation path determines repository structure, documentation, example content, and compatibility expectations.

## Decisions

### Theme Packaging

- The Hugo theme should be developed as a standard Hugo theme.
- The long-term preferred distribution model is a dedicated theme repository.
- The theme repository name can be `encanta-hugo-theme` or a similarly explicit variant.

### Supported Installation Methods

The theme should support three installation methods.

#### 1. Hugo Modules

This is the primary recommended workflow.

Initialization:

```bash
hugo mod init github.com/<your_user>/<your_project>
```

Import:

```toml
[module]
  [[module.imports]]
    path = "github.com/<owner>/encanta"
```

Typical update commands:

```bash
hugo mod get -u
hugo mod get -u ./...
hugo mod get -u github.com/<owner>/encanta
hugo mod get github.com/<owner>/encanta@v0.1.0
```

Why this is the default recommendation:

- aligns with modern Hugo theme distribution
- simplifies version management
- works well in CI/CD workflows
- avoids manual `themes/` management

#### 2. Git Submodule

This is a supported secondary workflow.

Example:

```bash
git submodule add <theme-repo-url> themes/encanta
```

Then enable it in the site configuration:

```toml
theme = "encanta"
```

Why support it:

- familiar to users coming from older Hugo workflows
- keeps the site repository separate from the theme source
- still allows controlled theme upgrades

#### 3. Direct Copy

Users may copy the theme into `themes/encanta` directly.

This is not the preferred path, but it should remain possible because:

- some users avoid submodules
- some users want full local control
- some environments are simpler with plain files

Trade-off:

- upgrades become manual
- divergence from upstream is easier

### Recommended End-User Workflow

For a typical Hugo site:

1. Create or open a Hugo site repository.
2. Initialize Hugo Modules if needed.
3. Add the theme through Hugo Modules.
4. Copy a minimal example configuration from the theme documentation.
5. Add content under `content/`.
6. Use the documented front matter and shortcodes.
7. Run the local Hugo server to preview the site.

### Required Theme Documentation

The theme should include:

- `README.md` in English
- `README_CN.md` in Chinese
- a quick start section
- installation instructions for all supported methods
- a minimal configuration example
- shortcode usage examples
- media embedding examples
- theme configuration reference
- upgrade notes when breaking changes appear

### Example Site

The theme should provide an `exampleSite/` directory.

Its purposes:

- show a working reference configuration
- demonstrate page structure and navigation
- include example posts with:
  - featured images
  - excerpts
  - tags and categories
  - formulas
  - Mermaid diagrams
  - audio and video shortcodes
  - embedded iframe examples

### Planned Theme Repository Structure

```text
encanta/
├── archetypes/
├── assets/
│   ├── css/
│   └── js/
├── layouts/
│   ├── _default/
│   ├── partials/
│   └── shortcodes/
├── static/
├── theme.toml
├── hugo.toml.example
└── exampleSite/
```

### Configuration Surface

The theme should expose configuration for:

- top navigation links
- footer links
- copyright text
- repository link
- license link
- sponsor information
- optional ICP record information
- theme mode default
- Waline integration
- article card behavior
- TOC behavior
- math and Mermaid toggles if needed

### Content Compatibility Expectations

The theme must work with the current content conventions:

- front matter fields such as `title`, `date`, `FeaturedImage`, `tags`, and `categories`
- the `<!-- more -->` summary boundary
- existing custom shortcodes where practical
- direct iframe embeds inside Markdown content

### Upgrade Philosophy

- keep defaults stable
- avoid unnecessary breaking changes
- document migration steps when configuration changes
- prefer additive options over silent behavioral changes

## Implementation Notes

This phase defines how the theme should be consumed. The actual Hugo scaffolding and implementation remain separate follow-up work.

## Testing Notes

- Verified that the proposed installation methods align with normal Hugo theme workflows.
- Verified that the delivery model remains compatible with a static-site publishing pipeline.

## Follow-ups

- Scaffold the Hugo theme structure.
- Draft the minimal configuration example for end users.
- Prefer a dedicated theme repository for Hugo Modules distribution.
