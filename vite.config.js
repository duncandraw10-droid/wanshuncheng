import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { renderSharedLayout } from './build/shared-layout.js'
import { renderSiteIcons } from './build/site-icons.js'

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
  }],
  build: {
    rollupOptions: {
      input: {
        molding: fileURLToPath(new URL('./smc-bmc-molding.html', import.meta.url)),
        transfer: fileURLToPath(new URL('./mold-transfer.html', import.meta.url)),
        box: fileURLToPath(new URL('./cases/smc-protective-box.html', import.meta.url)),
        tabletop: fileURLToPath(new URL('./cases/bmc-tabletop.html', import.meta.url)),
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
      },
    },
  },
})
