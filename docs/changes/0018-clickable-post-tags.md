# Clickable Post Tags

## Problem and implementation

Article headers and post cards rendered tags as plain text. Both now use
Hugo's `GetTerms "tags"` and each term's `RelPermalink` to link to its archive,
including custom taxonomy URLs and sites hosted under a path prefix.

Articles continue to show all tags; cards continue to show the first tag.
The card title link uses a CSS overlay to preserve whole-card navigation,
with the tag link above that overlay. This avoids invalid nested anchors.
Tag links have hover and keyboard-focus underlines; cards also show a focus outline.

## Verification

- Built `exampleSite` with Hugo v0.147.9:
  `hugo --source exampleSite --themesDir /Users/yu/repos --theme encanta --destination /private/tmp/encanta-tags-public`.
- Built a temporary fixture with a `/blog/` base URL, Chinese and multiword tags,
  a taxonomy page with a custom `url`, and an article without tags.
- Parsed both builds with Python's HTML parser: all 23 tag links resolve to
  generated pages, there are no nested anchors, articles retain all tags,
  custom taxonomy URLs are respected, and untagged articles have no tag links.
- `git diff --check` passed. Browser interaction and production deployment were
  not verified in this change.

## Rollout

The consuming site must update its pinned theme revision and redeploy, following
the module update workflow in the README.
