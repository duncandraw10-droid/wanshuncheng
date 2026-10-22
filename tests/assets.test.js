import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';
import { renderSharedLayout } from '../build/shared-layout.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const subpages = ['smc-bmc-molding.html', 'mold-transfer.html', 'cases/smc-protective-box.html', 'cases/bmc-tabletop.html'];
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
function readPage(page) {
  return renderSharedLayout(fs.readFileSync(path.join(root, page), 'utf8'), homepage, page.startsWith('cases/') ? '../' : './');
}
for (const page of ['index.html', 'privacy.html', '404.html', ...subpages]) {
  test(`${page}: all local references and accessible control targets exist`, () => {
    const html = readPage(page);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate element IDs');
    for (const match of html.matchAll(/\baria-controls="([^"]+)"/g)) {
      for (const id of match[1].split(/\s+/)) assert.ok(ids.includes(id), `missing control target: ${id}`);
    }
    for (const match of html.matchAll(/\b(?:src|srcset|href|data-photo|data-photo-webp|data-img-webp)="([^"]+)"/g)) {
      const urls = match[0].startsWith('srcset=') ? match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]) : [match[1]];
      for (const url of urls) {
      if (/^(?:https?:|data:|mailto:|tel:)/.test(url) || !url) continue;
      const target = new URL(url, `https://wsctw.com/${page}`);
      const relative = decodeURIComponent(target.pathname).replace(/^\//, '') || 'index.html';
      const sourcePath = path.join(root, relative);
      assert.ok(fs.existsSync(sourcePath) || fs.existsSync(path.join(root, 'public', relative)), `missing local asset: ${url}`);
      if (target.hash) {
        const targetPage = relative.endsWith('/') ? relative + 'index.html' : relative;
        const content = readPage(targetPage);
        assert.ok(content.includes(`id="${target.hash.slice(1)}"`), `missing anchor: ${url}`);
      }
      }
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
  assert.equal(schema.logo, 'https://wsctw.com/images/logo-topbar.png');
  assert.ok(html.includes('data-copy-text="info@wsctw.com"'));
  for (const page of ['index.html', 'privacy.html']) {
    const content = fs.readFileSync(path.join(root, page), 'utf8');
    assert.ok(!content.includes('fan6772@gmail.com'));
    for (const match of content.matchAll(/href="mailto:([^"?]+)(?:\?[^"\n]*)?"/g)) {
      assert.equal(match[1], 'info@wsctw.com');
    }
  }
});


test('service and case pages expose unique SEO, meaningful content and linked inquiry paths', () => {
  const titles = new Set();
  for (const page of subpages) {
    const html = readPage(page);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, page);
    assert.equal([...html.matchAll(/<link rel="canonical"/g)].length, 1, page);
    assert.ok(html.includes(`href="https://wsctw.com/${page}"`));
    assert.ok(html.includes(`property="og:url" content="https://wsctw.com/${page}"`));
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title)); titles.add(title);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList' && item.itemListElement.at(-1).item === `https://wsctw.com/${page}`));
    assert.ok(graph.some(item => item['@type'] === 'Organization' && item.email === 'info@wsctw.com'));
    assert.ok(html.includes('id="contact"'));
    assert.ok(html.includes('href="tel:034721912"'));
    assert.ok(html.includes('href="mailto:info@wsctw.com"'));
    assert.ok(!html.includes('<!-- shared:'));
    assert.ok(!html.includes('loadingArea'));
    assert.ok(!html.includes('<form'));
    const header = html.match(/<header\b[\s\S]*?<\/header>/)[0];
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
    for (const [fragment, original] of [[header, homepage.match(/<header\b[\s\S]*?<\/header>/)[0]], [footer, homepage.match(/<footer\b[\s\S]*?<\/footer>/)[0]]]) {
      const normalized = fragment.replace(/(?:\.\/|\.\.\/)#/g, '#').replace(/\.\.\//g, './');
      assert.equal(normalized, original, `global chrome drift in ${page}`);
    }
    if (!page.startsWith('cases/')) {
      assert.ok([...html.matchAll(/<details class="subpage-faq"/g)].length >= 4);
      assert.ok(graph.some(item => item['@type'] === 'Service'));
    } else {
      assert.ok(html.includes('href="../smc-bmc-molding.html"'));
      assert.ok(html.includes('href="../mold-transfer.html"'));
    }
    assert.ok(fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8').includes(`https://wsctw.com/${page}`));
    assert.ok(fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8').includes(`./${page}`));
  }
  for (const page of subpages) assert.ok(homepage.includes(`href="./${page}"`), `missing homepage entry: ${page}`);
});

test('service navigation and case links are directly available without expanding case introductions', () => {
  const html = readPage('index.html');
  assert.ok(html.includes('class="site-skip"'));
  assert.ok(html.includes('data-bs-toggle="dropdown"'));
  const header = html.match(/<header[\s\S]*?<\/header>/)[0];
  for (const target of ['./smc-bmc-molding.html', './mold-transfer.html']) assert.ok(header.includes(`href="${target}"`));
  for (const id of [1, 3]) {
    const details = html.match(new RegExp(`<div id="portfolio-details-${id}"[\\s\\S]*?</div>\\s*</div>`))[0];
    assert.ok(!details.includes('application-case-link'));
  }
  assert.ok(!html.includes('更能符合軌道交通嚴苛的抗壓與安規標準'));
});
