import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { build } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const origin = 'https://wsctw.com';
const pages = ['', 'smc-bmc-molding.html', 'mold-transfer.html', 'cases/smc-protective-box.html', 'cases/bmc-tabletop.html', 'privacy.html'];
const languages = [['zh-TW', ''], ['en', 'en/'], ['ja', 'ja/']];

function elements(node) {
  return (node.childNodes ?? []).flatMap(child => child.tagName ? [child, ...elements(child)] : []);
}

function attr(node, name) {
  return node.attrs.find(attribute => attribute.name === name)?.value;
}

function isLanguageMenu(node) {
  return attr(node, 'class')?.split(' ').includes('language-switch');
}

function outputFile(url) {
  const path = url.pathname.slice(1);
  return !path || path.endsWith('/') ? path + 'index.html' : path;
}

test('published pages have reciprocal language links, localized metadata and usable assets', async () => {
  const { output } = await build({ root, logLevel: 'silent', build: { write: false } });
  const files = new Map(output.map(file => [file.fileName, file]));
  const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8');
  const titles = new Set();

  for (const page of pages) {
    const alternates = Object.fromEntries([
      ...languages.map(([code, folder]) => [code, origin + '/' + folder + page]),
      ['x-default', origin + '/' + page],
    ]);

    for (const [code] of languages) {
      const url = new URL(alternates[code]);
      const built = files.get(outputFile(url));
      assert.ok(built, url.href);
      const nodes = elements(parse(String(built.source)));
      const links = nodes.filter(node => node.tagName === 'link');
      const canonical = links.filter(node => attr(node, 'rel') === 'canonical');
      const alternateLinks = links.filter(node => attr(node, 'rel') === 'alternate');
      assert.deepEqual(canonical.map(node => attr(node, 'href')), [url.href]);
      assert.equal(alternateLinks.length, 4);
      assert.deepEqual(Object.fromEntries(alternateLinks.map(node => [attr(node, 'hreflang'), attr(node, 'href')])), alternates);
      assert.equal(attr(nodes.find(node => node.tagName === 'html'), 'lang'), code);
      assert.ok(sitemap.includes(`<loc>${url.href}</loc>`), url.href);

      const title = nodes.find(node => node.tagName === 'title').childNodes[0].value;
      const description = attr(nodes.find(node => attr(node, 'name') === 'description'), 'content');
      const primaryHeading = nodes.filter(node => node.tagName === 'h1');
      assert.equal(primaryHeading.length, 1);
      assert.ok(title && description && !titles.has(title), url.href);
      titles.add(title);
      if (code === 'en') assert.doesNotMatch(title + description, /\p{Script=Han}/u, url.href);

      const menus = nodes.filter(isLanguageMenu);
      assert.equal(menus.length, page === 'privacy.html' ? 1 : 2);
      for (const menu of menus) {
        const options = elements(menu).filter(node => node.tagName === 'a');
        assert.equal(options.length, 3);
        for (const option of options) {
          const language = attr(option, 'lang');
          assert.equal(new URL(attr(option, 'href'), url).href, alternates[language]);
          assert.equal(attr(option, 'aria-current'), language === code ? 'page' : undefined);
        }
      }

      for (const node of nodes) {
        const references = ['src', 'href', 'data-photo', 'data-photo-webp', 'data-img-webp']
          .map(name => attr(node, name)).filter(Boolean);
        const candidates = attr(node, 'srcset')?.split(',') ?? [];
        references.push(...candidates.map(candidate => candidate.trim().split(/\s+/)[0]));
        for (const reference of references) {
          if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;
          const target = new URL(reference, url);
          const file = outputFile(target);
          assert.ok(files.has(file) || existsSync(resolve(root, 'public', file)),
            `${url.pathname} references a missing asset or page: ${reference}`);
          if (target.hash && files.get(file)?.type === 'asset' && file.endsWith('.html')) {
            assert.ok(String(files.get(file).source).includes(`id="${target.hash.slice(1)}"`), reference);
          }
        }
      }
    }
  }
});
