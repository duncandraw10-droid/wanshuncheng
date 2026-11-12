import { readFile } from 'node:fs/promises';
import { posix, resolve } from 'node:path';
import { parse, parseFragment, serialize } from 'parse5';
import english from '../locales/en.json' with { type: 'json' };
import japanese from '../locales/ja.json' with { type: 'json' };
import { renderSiteIcons } from './site-icons.js';

const origin = 'https://wsctw.com';
const languages = [
  { code: 'zh-TW', folder: '', label: '繁中', menu: '切換語言', og: 'zh_TW' },
  {
    code: 'en', folder: 'en/', label: 'English', menu: 'Change language', og: 'en_US', copy: english,
    inquiry: {
      subject: 'Compression molding inquiry',
      lines: [
        'Hello, please help us assess the following compression molding project:',
        '',
        '1. Part application and dimensions:',
        '2. Material and performance requirements (if known):',
        '3. Estimated quantity:',
        '4. Existing mold availability:',
        '5. Desired delivery date:',
        '6. Critical dimensions, appearance and acceptance requirements:',
        '',
        'Please attach drawings or product photos if available.',
      ],
    },
  },
  {
    code: 'ja', folder: 'ja/', label: '日本語', menu: '言語を切り替える', og: 'ja_JP', copy: japanese,
    inquiry: {
      subject: '圧縮成形のお見積もり依頼',
      lines: [
        'お世話になっております。以下の圧縮成形案件についてご検討をお願いいたします。',
        '',
        '1. 製品の用途と寸法：',
        '2. 材料と性能の要件（分かる範囲）：',
        '3. 予定数量：',
        '4. 既存金型の有無：',
        '5. 希望納期：',
        '6. 重要寸法、外観、受入検査の要件：',
        '',
        '図面や製品写真がありましたら添付してください。',
      ],
    },
  },
];
const [original] = languages;

const sourceCharacters = /[\p{Script=Han}（）。，、；：？！・／－〜「」]/u;
const assetAttributes = new Set(['href', 'src', 'data-photo', 'data-photo-webp', 'data-img-webp']);
const copyAttributes = new Set([
  'alt', 'title', 'aria-label', 'aria-roledescription', 'data-photo-title',
  'data-collapse-label', 'data-copy-success', 'data-copy-manual', 'data-copy-failure',
]);

function fileFor(page, language) {
  return language.folder + page;
}

function pathFor(page, language) {
  return '/' + (page === 'index.html' ? language.folder : fileFor(page, language));
}

function relativeHref(fromFile, targetPath) {
  const relative = posix.relative(posix.dirname('/' + fromFile), targetPath);
  if (!relative) return './';
  const href = relative.startsWith('.') ? relative : './' + relative;
  return targetPath.endsWith('/') ? href + '/' : href;
}

function getAttr(node, name) {
  return node.attrs?.find(attribute => attribute.name === name)?.value;
}

function setAttr(node, name, value) {
  const attribute = node.attrs.find(item => item.name === name);
  if (attribute) attribute.value = value;
  else node.attrs.push({ name, value });
}

function visit(node, callback) {
  callback(node);
  if (node.tagName === 'script' || node.tagName === 'style') return;
  for (const child of [...(node.childNodes ?? [])]) visit(child, callback);
}

function insertMarkup(parent, markup, index = parent.childNodes.length, deleteCount = 0) {
  const nodes = parseFragment(markup).childNodes;
  for (const node of nodes) node.parentNode = parent;
  parent.childNodes.splice(index, deleteCount, ...nodes);
}

function languageMenu(page, language) {
  const file = fileFor(page, language);
  const options = languages.map(option => {
    const selected = option === language;
    return `<li><a class="dropdown-item" href="${relativeHref(file, pathFor(page, option))}" lang="${option.code}" hreflang="${option.code}"${selected ? ' aria-current="page"' : ''}>${option.label}${selected ? '<span data-site-icon="check" class="site-icon-compact"></span>' : ''}</a></li>`;
  }).join('\n');
  return renderSiteIcons(`<div class="dropdown language-switch">
    <button class="language-switch-toggle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="${language.menu}: ${language.label}">
      <span data-site-icon="globe"></span><span class="language-switch-current" lang="${language.code}">${language.label}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      ${options}
    </ul>
  </div>`);
}

export function siteLanguagePages(pages) {
  const originalPaths = new Map(pages.flatMap(page => [
    [pathFor(page, original), page], ['/' + page, page],
  ]));
  const routes = new Map(languages.flatMap(language => pages.flatMap(page => {
    const route = { page, language };
    return [[pathFor(page, language), route], ['/' + fileFor(page, language), route]];
  })));

  function renderPage(html, page, language) {
    const file = fileFor(page, language);
    const canonical = origin + pathFor(page, language);
    const tree = parse(html);
    const root = tree.childNodes.find(node => node.tagName === 'html');
    const head = root.childNodes.find(node => node.tagName === 'head');
    setAttr(root, 'lang', language.code);

    function translate(value) {
      const key = value.trim();
      if (Object.hasOwn(language.copy, key)) return value.replace(key, () => language.copy[key]);
      if (sourceCharacters.test(key)) throw new Error(`Missing ${language.code} translation in ${page}: ${key}`);
      return value;
    }

    function rewriteReference(value) {
      if (!value || value.startsWith('#') || value.startsWith('//')) return value;
      if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
        if (value === 'tel:034721912') return 'tel:+88634721912';
        if (value.startsWith('mailto:') && value.includes('?')) {
          const recipient = new URL(value).pathname;
          const { subject, lines } = language.inquiry;
          return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`;
        }
        if (value.startsWith('https://fonts.googleapis.com/css2') && language.code === 'ja') {
          return value.replace('Noto+Sans+TC:', 'Noto+Sans+JP:');
        }
        if (/^https:\/\/(?:tools|policies|support)\.google\.com\//.test(value)) {
          const url = new URL(value);
          if (url.searchParams.has('hl')) url.searchParams.set('hl', language.code);
          return url.href;
        }
        return value;
      }
      const target = new URL(value, origin + '/' + page);
      const internalPage = originalPaths.get(target.pathname);
      if (!internalPage && value.startsWith('/')) return value;
      const path = internalPage ? pathFor(internalPage, language) : target.pathname;
      return relativeHref(file, path) + target.search + target.hash;
    }

    function translateSchema(value) {
      if (typeof value === 'string') {
        if (value === original.code) return language.code;
        if (value.startsWith(origin + '/') && value !== origin + '/#organization') {
          const url = new URL(value);
          const target = originalPaths.get(url.pathname);
          if (target) return origin + pathFor(target, language) + url.search + url.hash;
        }
        return translate(value);
      }
      if (Array.isArray(value)) return value.map(translateSchema);
      if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
          key, key === 'url' && value['@type'] === 'Organization' ? entry : translateSchema(entry),
        ]));
      }
      return value;
    }

    visit(tree, node => {
      if (node.nodeName === '#comment' && node.data.trim() === 'language-switch') {
        const parent = node.parentNode;
        insertMarkup(parent, languageMenu(page, language), parent.childNodes.indexOf(node), 1);
        return;
      }
      if (node.tagName === 'link' && getAttr(node, 'rel') === 'canonical') setAttr(node, 'href', canonical);
      if (getAttr(node, 'property') === 'og:url') setAttr(node, 'content', canonical);
      if (getAttr(node, 'property') === 'og:locale') setAttr(node, 'content', language.og);
      if (!language.copy) return;

      if (node.nodeName === '#text') node.value = translate(node.value);
      if (node.tagName === 'script' && getAttr(node, 'type') === 'application/ld+json') {
        const script = node.childNodes[0];
        const schema = translateSchema(JSON.parse(script.value));
        script.value = JSON.stringify(schema, null, 2).replace(/</g, '\\u003c');
      }
      for (const attribute of node.attrs ?? []) {
        const { name, value } = attribute;
        if (copyAttributes.has(name) || (node.tagName === 'meta' && name === 'content')) {
          attribute.value = translate(value);
        } else if (assetAttributes.has(name)) {
          attribute.value = rewriteReference(value);
        } else if (name === 'srcset') {
          attribute.value = value.split(',').map(candidate => {
            const [url, ...descriptor] = candidate.trim().split(/\s+/);
            return [rewriteReference(url), ...descriptor].join(' ');
          }).join(', ');
        } else if (name === 'data-copy-text' && value === '034721912') {
          attribute.value = '+88634721912';
        }
      }
      if (getAttr(node, 'data-copy-template') !== undefined) {
        setAttr(node, 'data-inquiry-template', language.inquiry.lines.join('\n'));
      }
    });

    const alternates = [...languages.map(option => [
      option.code, pathFor(page, option),
    ]), ['x-default', pathFor(page, original)]];
    insertMarkup(head, '\n' + alternates.map(([code, path]) =>
      `  <link rel="alternate" hreflang="${code}" href="${origin + path}">`
    ).join('\n') + '\n');

    return serialize(tree);
  }

  return {
    name: 'site-language-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        const url = new URL(request.url, origin);
        if (url.pathname === '/en' || url.pathname === '/ja') {
          response.writeHead(301, { Location: url.pathname + '/' + url.search }).end();
          return;
        }
        const route = routes.get(url.pathname);
        if (!route) return next();
        try {
          const source = await readFile(resolve(server.config.root, route.page), 'utf8');
          const html = await server.transformIndexHtml('/' + route.page, source);
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(renderPage(html, route.page, route.language));
        } catch (error) {
          next(error);
        }
      });
    },
    generateBundle: {
      // Vite's HTML hook has already resolved compiled assets in each source page.
      order: 'post',
      handler(_options, bundle) {
        for (const page of pages) {
          const asset = bundle[page];
          if (asset?.type !== 'asset') this.error('Missing built page: ' + page);
          const html = String(asset.source);
          asset.source = renderPage(html, page, original);
          for (const language of languages.slice(1)) {
            this.emitFile({
              type: 'asset',
              fileName: fileFor(page, language),
              source: renderPage(html, page, language),
            });
          }
        }
      },
    },
  };
}
