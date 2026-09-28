import { defineConfig } from 'vite'

export default defineConfig({
  // Using relative base ensures assets can be loaded correctly regardless of whether 
  // it's hosted at the root (/) or a subdirectory (/repo-name/) on GitHub Pages.
  base: './',
})
