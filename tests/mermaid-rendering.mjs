import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const temporary = mkdtempSync(join(tmpdir(), 'encanta-mermaid-'));
const site = join(temporary, 'site');
const themes = join(temporary, 'themes');
const publicDir = join(temporary, 'public');
const hugo = process.env.HUGO_BIN || 'hugo';

const build = () => {
  execFileSync(hugo, ['--source', site, '--themesDir', themes, '--destination', publicDir], { stdio: 'pipe' });
  return readFileSync(join(publicDir, 'hello-encanta/index.html'), 'utf8');
};

try {
  cpSync(join(root, 'exampleSite'), site, { recursive: true });
  for (const entry of ['layouts', 'assets', 'theme.toml']) {
    cpSync(join(root, entry), join(themes, 'encanta', entry), { recursive: true });
  }

  assert.doesNotMatch(build(), /mermaid@12\.2\.0/);

  const post = join(site, 'content/posts/hello-encanta.md');
  const original = readFileSync(post, 'utf8');
  writeFileSync(post, `${original}\n\`\`\`mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: "#fffaf3"
---
flowchart LR
    A["浏览器"] --> B["Raft 数据<br/>/srv/openbao/data"]
    classDef edge fill:#f2e9e1,stroke:#907aa9,color:#464261;
    class A edge;
\`\`\`

\`\`\`text
ordinary code
\`\`\`

\`\`\`mermaid
flowchart LR
    A["</pre><script>alert(1)</script>"] --> B["safe"]
\`\`\`
`);

  const html = build();
  assert.match(html, /class="mermaid-diagram"/);
  assert.equal((html.match(/<pre class="mermaid">/g) || []).length, 2);
  assert.match(html, /primaryColor: &#34;#fffaf3&#34;/);
  assert.match(html, /Raft 数据&lt;br\/?&gt;\/srv\/openbao\/data/);
  assert.match(html, /&lt;\/pre&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<code class="language-mermaid"/);
  assert.match(html, /<code class="language-text"/);
  assert.equal((html.match(/mermaid@12\.2\.0/g) || []).length, 1);
  console.log('Mermaid render hook checks passed.');
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
