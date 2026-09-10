# 0019 Waline Configuration Serialization

## Problem

Article pages displayed the 评论 heading but failed to render the Waline form.
The generated HTML at https://miyunda.com/pdf2png/ confirmed that `serverURL`
contained literal quote characters. The same defect was reproduced locally.

## Decision

Pass typed configuration values directly into Hugo's JavaScript template context.
Hugo already serializes and escapes these values. Applying `jsonify` first turned
arrays into JSON strings and added literal quotes to string values. This violated
[Waline's option types](https://waline.js.org/en/reference/client/props.html),
including `serverURL`, `meta`, and `requiredMeta`.

Keep Hugo's contextual escaping rather than bypassing it with `safeJS`. No client
library, server configuration, or authentication behavior changes are needed.

## Verification

- Built the example article with Waline enabled using Hugo v0.150.0.
- Added `tests/waline-config.mjs` to evaluate generated initialization options.
- Confirmed the regression check fails with the original template and passes with
  the fix, including custom values and script-closing characters.
- Confirmed disabled Waline and missing server URLs omit the client integration.
- Live browser rendering and comment submission remain to be verified after rollout.

## Rollout

The consuming blog must update its pinned theme module and redeploy, following
README.md's Module Update Workflow. A change in this theme checkout alone does
not update the public blog.
