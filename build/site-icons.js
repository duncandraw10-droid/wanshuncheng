// Render shared interface icons at build time so every page shares one geometry.
// CSS owns size and color; the parent link/button retains its accessible name.
const paths = {
  'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
  'arrow-left': 'M19 12H5m6-6-6 6 6 6',
  'arrow-down': 'M12 5v14m-6-6 6 6 6-6',
  camera: 'M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2m11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0',
  ruler: 'M3 17 17 3l4 4L7 21Zm3-3 3 3m0-6 2 2m1-5 3 3m0-6 2 2',
  'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 12h8m-8 4h6',
};

export function renderSiteIcons(html) {
  return html.replace(/<span\b([^>]*\bdata-site-icon="([^"]+)"[^>]*)>\s*<\/span>/g, (_, attributes, name) => {
    if (!Object.hasOwn(paths, name)) throw new Error(`Unknown site icon: ${name}`);
    const classes = attributes.match(/\bclass="([^"]*)"/)?.[1];
    return `<svg class="site-icon${classes ? ` ${classes}` : ''}" data-site-icon="${name}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[name]}"/></svg>`;
  });
}
