# 0017 About Layout Compatibility

## Context

Some Hugo sites model the about page as `content/about.md`.
Others use `type = "about"` or a branch bundle such as `content/about/_index.md`.

## Decision

Add explicit `layouts/about/single.html` and `layouts/about/list.html` templates and route them through the same standalone page partial used by generic non-post pages.

## Result

The theme can render common about-page setups without requiring the consuming site to add custom templates.
