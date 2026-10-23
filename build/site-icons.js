// Render navigation arrows at build time so every page shares one geometry.
// CSS owns size and color; the parent link/button retains its accessible name.
const paths = {
  'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
  'arrow-left': 'M19 12H5m6-6-6 6 6 6',
  'arrow-down': 'M12 5v14m-6-6 6 6 6-6',
};

export function renderSiteIcons(html) {
  return html.replace(/<span\b([^>]*\bdata-site-icon="([^"]+)"[^>]*)>\s*<\/span>/g, (_, attributes, name) => {
    if (!Object.hasOwn(paths, name)) throw new Error(`Unknown site icon: ${name}`);
    const classes = attributes.match(/\bclass="([^"]*)"/)?.[1];
    return `<svg class="site-icon${classes ? ` ${classes}` : ''}" data-site-icon="${name}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[name]}"/></svg>`;
  });
}
