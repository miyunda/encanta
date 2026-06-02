# 0002 Site Architecture

## Scope

Define the initial architecture for `encanta` as a Hugo-based personal blog with a static-first publishing model.

## Motivation

The project already has a clear content model and publishing direction. The next step is to lock the architectural boundaries before theme and template implementation starts.

## Decisions

### Static-First Boundary

- The site remains a static website.
- Hugo is the site generator.
- Markdown content remains the primary authoring format.
- Deployment should support Cloudflare Pages and GitHub Actions.
- Comments remain externalized through Waline.

### Why Not a Dynamic Blog

- Article pages, taxonomy pages, navigation, excerpts, and previous/next links are deterministic content and fit static rendering well.
- Theme switching can be handled client-side with `localStorage` and `prefers-color-scheme`.
- Reading progress, TOC highlighting, math rendering, and diagrams are front-end enhancements, not reasons to introduce a server-rendered app.
- The current media needs do not justify replacing the static publishing workflow with a dynamic framework.

### Content Model

The existing Markdown front matter remains compatible:

```yaml
---
title: apt-key不安全?
date: 2021-03-17 06:30:29
FeaturedImage: https://cdn.miyunda.net/uPic/apt-key-cover_20231027.jpeg
categories:
  - 信息技术
tags:
  - Debian
  - APT
  - Ubuntu
  - Mint
---
```

Planned behavior:

- `title`: primary article title
- `date`: publish date and default chronological sort key
- `FeaturedImage`: article thumbnail and social preview image
- `categories` and `tags`: taxonomy generation
- `<!-- more -->`: excerpt boundary for listing pages
- If `<!-- more -->` is missing, the system extracts a fallback excerpt from the article body

### Listing and Card Layout

- The home page and article listing pages should use CSS Grid, not JavaScript layout logic.
- Grid columns should adapt automatically to viewport width.
- Article cards include:
  - featured image
  - title
  - excerpt
  - publish date
  - optional taxonomy metadata
- Featured images target a `16:10` frame.
- Image rendering should prefer cropping via CSS `object-fit: cover`, not stretching.

### Theme Strategy

- Support three theme modes:
  - `light`
  - `dark`
  - `system`
- The light palette is Rosé Pine Dawn.
- The dark palette is Rosé Pine.
- Theme colors should be exposed through semantic CSS custom properties.
- Initial theme selection should run early enough to avoid a flash of incorrect theme.

### Navigation and Footer

Top navigation:

- Default links:
  - Articles
  - Tags
  - Categories
  - About
- Custom links should be configurable and displayed on the right side of the header.

Footer:

- copyright text
- source repository link
- license link
- sponsor information
- optional Mainland China ICP record metadata

These should be configuration-driven, not hard-coded in templates.

### Article Page Experience

Each article page should support:

- rich Markdown rendering
- table of contents
- reading progress indicator
- previous/next article navigation
- Waline comments

### Markdown and Rich Content

Base rendering:

- headings
- blockquotes
- code blocks
- tables
- lists
- images

Enhancements:

- math formulas via KaTeX
- diagrams and flowcharts via Mermaid
- syntax highlighting through Hugo's built-in highlighter unless a stronger need appears later

### Media Strategy

Audio:

- keep a dedicated `music` shortcode for CDN-hosted audio content
- preserve metadata fields such as `url`, `name`, `artist`, and `cover`

Video:

- keep a dedicated `video-js` shortcode for direct media playback
- preserve compatibility with the current `video-js` embedding pattern

Third-party embedded players:

- support safe iframe embedding for providers such as NetEase Cloud Music and AcFun
- wrap third-party embeds in responsive containers
- treat provider availability and regional network behavior as external dependencies

### Proposed Hugo Structure

```text
layouts/
  _default/
  partials/
  shortcodes/
assets/
  css/
  js/
static/
exampleSite/
```

Planned responsibilities:

- `layouts/_default/`: base templates for list and single pages
- `layouts/partials/`: header, footer, card, TOC, theme toggle, comments, and metadata partials
- `layouts/shortcodes/`: `music`, `video-js`, and embed helpers
- `assets/css/`: theme tokens, layout, typography, content styling
- `assets/js/`: theme switching, reading progress, TOC behavior, Mermaid bootstrapping
- `static/`: static assets that do not need pipeline processing
- `exampleSite/`: reference site configuration and sample content

### Deployment Direction

- Primary target: Cloudflare Pages
- Secondary supported path: GitHub Actions static build and publish
- The generated site output remains static HTML, CSS, and JavaScript

## Implementation Notes

This phase intentionally does not scaffold the Hugo project yet. The goal is to lock the architecture first, then build from a topic branch with fewer reversals.

## Testing Notes

- Verified that the architectural choices remain compatible with the current Markdown format and excerpt marker usage.
- Verified that all listed feature requirements can be satisfied without moving away from a static-site architecture.

## Follow-ups

- Scaffold the Hugo site structure on a separate implementation step.
- Implement the theme token system and base templates.
- Define the site configuration format for top links, footer links, sponsorship, and optional ICP metadata.
