import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { renderSharedLayout } from './build/shared-layout.js'
import { renderSiteIcons } from './build/site-icons.js'
import { siteLanguagePages } from './build/site-languages.js'

const contentPages = [
  './index.html',
  './smc-bmc-molding.html',
  './mold-transfer.html',
  './cases/smc-protective-box.html',
  './cases/bmc-tabletop.html',
  './privacy.html',
]

export default defineConfig({
  base: './',
  plugins: [{
    name: 'shared-site-layout',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const homepage = readFileSync(new URL('./index.html', import.meta.url), 'utf8')
        const page = renderSharedLayout(html, homepage, context.path.startsWith('/cases/') ? '../' : './')
        return renderSiteIcons(page)
      },
    },
  }, {
    name: 'preserve-module-script-defer',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Vite regenerates module tags; retain the explicit defer attribute in dist.
        return html.replace(/<script\b[^>]*>/g, (tag) => {
          if (/\btype=["']module["']/.test(tag) && /\bsrc=/.test(tag) && !/\sdefer(?:\s|=|>)/.test(tag)) {
            return tag.replace('<script', '<script defer')
          }
          return tag
        })
      },
    },
  }, siteLanguagePages(contentPages.map(page => page.slice(2)))],
  build: {
    rollupOptions: {
      input: [...contentPages, './404.html'].map(page => fileURLToPath(new URL(page, import.meta.url))),
    },
  },
})
