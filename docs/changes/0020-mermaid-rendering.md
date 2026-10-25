# 0020 Mermaid Rendering

## Scope

Render fenced `mermaid` blocks as diagrams in article and standalone page content.
Leave other fenced code blocks and their copy/collapse controls unchanged.

## Decision

Use Hugo's language-specific code block render hook to preserve Mermaid source,
including per-diagram YAML configuration and colors. The code block enhancement
skips these blocks. Load Mermaid 12.2.0 from jsDelivr only on pages containing a
diagram, with Mermaid's strict security level. Give diagrams a light canvas so
author-selected light palette colors remain readable in either site theme.
Keep flowcharts at their natural width so wide ones can scroll on narrow screens
instead of becoming too small to read.

The CDN choice is intentionally minimal. Test actual access from mainland China
after rollout before considering a locally hosted bundle. The READMEs describe
basic Mermaid syntax and the current security boundary; detailed author guidance
and templates are deferred until the deployed rendering has been reviewed.

## Verification

- `node tests/mermaid-rendering.mjs` and `node tests/waline-config.mjs` passed
  with Hugo v0.167.0 and Node.js v26.11.1. JavaScript syntax and `git diff --check`
  also passed.
- A temporary local Hugo preview rendered the supplied OpenBao flowchart from
  jsDelivr as SVG. Its class colors and `<br/>` label break appeared correctly.
  At a 579px viewport, the diagram scrolls within its container without widening
  the page, and it has no code copy/collapse controls.
- Mainland China CDN access and the live site remain unverified.
- The consuming site must update its pinned theme module and redeploy before its
  live pages can show this change.
