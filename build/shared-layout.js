// The homepage is the single source for global navigation and company details.
// Vite renders these fragments before processing assets, both in dev and dist.
export function renderSharedLayout(html, homepage, prefix = './') {
  return html.replace(/<!-- shared:(header|footer) -->/g, (_, name) => {
    const fragment = homepage.match(new RegExp(`<${name}\\b[\\s\\S]*?<\\/${name}>`))?.[0];
    if (!fragment) throw new Error(`Missing shared ${name} in index.html`);
    return fragment
      .replace(/(href|src)="\.\//g, `$1="${prefix}`)
      .replace(/href="#(?!contact")/g, `href="${prefix}#`);
  });
}
