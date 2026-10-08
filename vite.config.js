import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [{
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
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
      },
    },
  },
})
