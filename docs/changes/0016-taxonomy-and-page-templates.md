# 0016 Taxonomy And Page Templates

## Context

The theme header now exposes built-in links for tags, categories, and about-style pages.
However, the theme only had generic list and article templates, which caused taxonomy routes to render as empty post indexes and non-post single pages to inherit article-specific chrome.

## Decision

Add dedicated templates for:

- taxonomy term indexes (`terms.html`)
- taxonomy entry pages (`taxonomy.html`)
- non-post single pages inside the existing `single.html`

## Result

Users can keep header links to tags, categories, and about pages without adding custom templates in their site repository.
