import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = path.resolve(new URL('..', import.meta.url).pathname);
for (const page of ['index.html', 'privacy.html', '404.html']) {
  test(`${page}: all local references and accessible control targets exist`, () => {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate element IDs');
    for (const match of html.matchAll(/\baria-controls="([^"]+)"/g)) {
      for (const id of match[1].split(/\s+/)) assert.ok(ids.includes(id), `missing control target: ${id}`);
    }
    for (const match of html.matchAll(/\b(?:src|srcset|href|data-photo|data-photo-webp|data-img-webp)="([^"]+)"/g)) {
      const url = match[1];
      if (/^(?:https?:|data:|mailto:|tel:|#)/.test(url) || url === './' || url.startsWith('./#')) continue;
      const relative = url.replace(/^\.\//, '').replace(/^\//, '');
      assert.ok(fs.existsSync(path.join(root, relative)) || fs.existsSync(path.join(root, 'public', relative)), `missing local asset: ${url}`);
    }
  });
}

test('home page keeps usable contact actions, media and formal-domain SEO', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(html.includes('tel:034721912'));
  assert.ok(html.includes('tel:0932271570'));
  assert.ok(html.includes('mailto:info@wsctw.com'));
  assert.ok(html.includes('https://wsctw.com/'));
  assert.equal([...html.matchAll(/class="[^\"]*\bportfolio-item\b/g)].length, 6);
  assert.equal([...html.matchAll(/class="[^\"]*\bequip-tab\b/g)].length, 3);
  assert.equal([...html.matchAll(/data-copy-text=/g)].length, 3);
  assert.ok(html.includes('data-copy-template'));
  assert.ok(html.includes('data-modal-close'));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.url, 'https://wsctw.com/');
  assert.equal(schema.email, 'info@wsctw.com');
  assert.ok(html.includes('data-copy-text="info@wsctw.com"'));
  for (const page of ['index.html', 'privacy.html']) {
    const content = fs.readFileSync(path.join(root, page), 'utf8');
    assert.ok(!content.includes('fan6772@gmail.com'));
    for (const match of content.matchAll(/href="mailto:([^"?]+)(?:\?[^"\n]*)?"/g)) {
      assert.equal(match[1], 'info@wsctw.com');
    }
  }
});
