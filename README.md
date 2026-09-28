# 萬順承實業有限公司 Website

This is a Vite-powered static website featuring Vanilla JS and Tailwind CSS.

## Setup & Development
To run this project locally, you need Node.js installed.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Build
To build for production:
```bash
npm run build
```
The output will be in the `dist` directory.

## GitHub Pages Deployment
This repository is configured to automatically build and deploy to GitHub Pages whenever changes are pushed to the `main` branch. 

- **Repository Path**: If deploying to a project page (e.g., `username.github.io/my-repo`), the `base: './'` in `vite.config.js` ensures relative asset paths work automatically.
- **Workflow**: See `.github/workflows/deploy-pages.yml` for the deployment pipeline. Ensure your GitHub Repository settings have GitHub Pages configured to use "GitHub Actions" as the source.

## Modifying Images
See `IMAGE_REPLACEMENT.md` for guidelines on replacing the current placeholder images with real company assets. 

## Future RFQ Backend Integration
The current RFQ form operates in a **Safe Display Mode** which simulates a success response without actually transmitting data.
To connect a real backend:
1. Open `src/main.js`.
2. Locate the form submission event listener: `rfqForm.addEventListener('submit', ...)`
3. Replace the `setTimeout` block with a real `fetch()` request to your secure backend endpoint.
