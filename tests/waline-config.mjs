import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const temporary = mkdtempSync(join(tmpdir(), 'encanta-waline-'));
const site = join(temporary, 'site');
const themes = join(temporary, 'themes');
const hugo = process.env.HUGO_BIN || 'hugo';

try {
  cpSync(join(root, 'exampleSite'), site, { recursive: true });
  for (const entry of ['layouts', 'assets', 'theme.toml']) {
    cpSync(join(root, entry), join(themes, 'encanta', entry), { recursive: true });
  }
  const baseConfig = readFileSync(join(site, 'hugo.toml'), 'utf8');
  function build(settings) {
    writeFileSync(join(site, 'hugo.toml'), `${baseConfig}\n[params.waline]\n${settings}\n`);
    execFileSync(hugo, ['--source', site, '--themesDir', themes, '--destination', join(temporary, 'public')], { stdio: 'pipe' });
    return readFileSync(join(temporary, 'public/hello-encanta/index.html'), 'utf8');
  }
  function options(html) {
    const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(script, 'Waline module is rendered');
    let captured;
    runInNewContext(script.replace(/import \{ init \} from '[^']+';/, ''), {
      init: value => { captured = JSON.parse(JSON.stringify(value)); },
      window: { location: { pathname: '/hello-encanta/' } },
    });
    return captured;
  }
  const defaults = options(build('enable = true\nserverURL = "https://waline.example.com"'));
  assert.equal(defaults.serverURL, 'https://waline.example.com');
  assert.equal(defaults.lang, 'zh-CN');
  assert.equal(defaults.login, 'enable');
  assert.deepEqual(defaults.meta, ['nick', 'mail', 'link']);
  assert.deepEqual(defaults.requiredMeta, []);
  assert.deepEqual(defaults.emoji, []);
  assert.equal(defaults.recaptchaV3Key, '');
  assert.equal(defaults.pageview, false);
  assert.equal(defaults.pageSize, 10);
  assert.equal(defaults.path, '/hello-encanta/');

  const custom = options(build(`enable = true
serverURL = 'https://waline.example.com/</script>?value="quoted"&other=1'
lang = "en"
login = "disable"
meta = ["nick", "mail"]
requiredMeta = ["nick"]
emoji = ["https://example.com/emoji"]
recaptchaV3Key = "public-key"
pageview = true
pageSize = 20`));
  assert.equal(custom.serverURL, 'https://waline.example.com/</script>?value="quoted"&other=1');
  assert.equal(custom.lang, 'en');
  assert.equal(custom.login, 'disable');
  assert.deepEqual(custom.meta, ['nick', 'mail']);
  assert.deepEqual(custom.requiredMeta, ['nick']);
  assert.deepEqual(custom.emoji, ['https://example.com/emoji']);
  assert.equal(custom.recaptchaV3Key, 'public-key');
  assert.equal(custom.pageview, true);
  assert.equal(custom.pageSize, 20);

  for (const settings of ['enable = false\nserverURL = "https://waline.example.com"', 'enable = true']) {
    assert.doesNotMatch(build(settings), /id="waline"|@waline\/client/);
  }
  console.log('Waline configuration regression checks passed.');
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
