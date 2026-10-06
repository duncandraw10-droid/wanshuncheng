# 萬順承實業有限公司 Website

This is a Vite-powered static website featuring Vanilla JS and Bootstrap 5.3.8.

## Bootstrap structure

- Production pages: `index.html` and `404.html`, both included in the Vite build.
- Layout: stock Bootstrap `container`, `row`, `col-*`, and responsive utilities.
- Native components: Navbar/Collapse, Carousel, Modal, Toast, buttons, cards and progress bars.
- Local Bootstrap assets: `public/vendor/bootstrap/`, verified against the official SHA-384 hashes.
- Local Material Symbols subset: `public/fonts/material-symbols-outlined.ttf`, covering all existing icons.
- `src/styles.css` retains brand colors, image composition, loading animation, scroll reveal and slider snapping.
- `src/main.js` preserves the copy helpers, image modal API, equipment image attributes, scroll navigation and portfolio slider, using Bootstrap component APIs for menu/modal/toast behavior.
- Tailwind dependencies and configuration are no longer used. Historical backup pages and old one-off editing scripts are not production inputs.

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

## Contact behavior
Phone links open the dialer; email links open the user's mail application.
Copy buttons copy the existing number, email address or inquiry template.
There is no server-side inquiry submission in the current page.

## Brand opening and hero

The home page uses a short brand reveal and split curtains, followed by a diagonal blue hero panel and three Bootstrap Carousel slides. All images and business information come from the existing website. The carousel supports dots, previous/next controls, touch and keyboard interaction. An opening skip button is included; repeat visits and deep links skip the opening. Reduced-motion settings disable the opening and automatic carousel playback, and disabled session storage does not block the page.

Design reference: https://www.tungyu.com/tw/ (opening rhythm and diagonal hero composition; independently implemented for Wan Shun Cheng).

## Brand foundation

The ten supplied brand color tokens live in `src/styles.css` and map into Bootstrap variables. Navy is used for headings, the hero panel and footer; blue is used for primary buttons, links and interaction states. Secondary text and dark-surface text use their dedicated brand tokens. General borders and interactive control borders are separate.

Type sizes (desktop / mobile): hero 48–56 / 32–36 px at 700; section headings 36–40 / 28–32 px at 700; content headings 24 / 20 px at 600; body 18 / 16 px at 400; helper copy 14 px at 400. Desktop sizes start at the Bootstrap `lg` breakpoint (992 px). The original fonts remain, with the Noto Sans TC 600 face added for content headings. Bootstrap utility `text-primary` continues to indicate the blue accent; the semantic `--text-primary` token sets the navy body color.

## Full-page composition

The home page follows the reference's sequence and composition: centered portrait case gallery, asymmetric equipment feature with a smaller supporting card, full-width navy company introduction, large image beside capability rows, process strip, contact information and footer. Original company copy, photographs, anchors, copy actions and custom equipment attributes are retained. Reference news and certification claims are not introduced; those compositions use the company's existing capability and workflow content instead. All layout uses Bootstrap container/row/col and utility classes, with `src/page-layout.css` limited to brand composition, image proportions and responsive refinements.

The case gallery supports previous/next controls, touch scrolling, keyboard arrows and photo enlargement through the existing Bootstrap Modal. Equipment controls cycle the existing three machines and synchronize the large photo, caption, counter, progress and original selection buttons. Opening, hero carousel, native mobile Collapse, contact links and copy Toast behavior remain available.

The homepage hides the auxiliary-equipment card and footer logo. Footer contact labels align with the first line of their values on desktop and mobile.

Quality management includes IQC, IPQC with FAI, FQC/OQC, and batch traceability, each with an original inline icon and two concise statements. Contact actions precede preparation details on mobile. Business hours: daily 08:00–17:00; typical response: one working day. PDF, photos and CAD drawings are accepted via email. No online-upload or form-submission service is implied. Existing equipment data and portfolio order are preserved; unconfirmed specifications are not published.

The equipment section now places the three original equipment selectors in the left column (5/12) and the image/caption in the right column (7/12) from the lg breakpoint. Photos remain uncropped and are limited to 360–420px on desktop. Smaller screens show three compact tonnage buttons, the selected photo and caption, then the inquiry CTA. Original image paths, selection data attributes and descriptions are retained; no unconfirmed specifications are added.
