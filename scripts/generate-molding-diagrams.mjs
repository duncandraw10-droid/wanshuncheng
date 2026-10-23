import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Unitless teaching geometry, not the dimensions or construction of a real tool.
// The same dies, carriers and guide positions are used in every mold state.
const out = fileURLToPath(new URL('../public/images/diagrams/', import.meta.url));
const lowerDie = 'M190 550V420H260L324 500H636L700 420H770V550Z';
const upperDie = 'M190 300H770V420H730V408H694.233L630.233 488H329.767L265.767 408H230V420H190Z';
// Inner sloping walls are parallel to the female die. The material section is
// the only space between the dies when closed; outer parting lands meet at y420.
const material = 'M230 408H265.767L329.767 488H630.233L694.233 408H730V420H700L636 500H324L260 420H230Z';
const colors = { ink: '#172B46', metal: '#D7DEE7', sleeve: '#B9C5D4', blue: '#2563EB' };
const rect = (x, y, w, h, fill = colors.metal, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const profile = (d, fill) => `<path d="${d}" fill="${fill}"/>`;
function upper(dy) {
  return `<g transform="translate(0 ${dy})">${rect(70,250,820,50)}${profile(upperDie,colors.metal)}${rect(95,242,50,66,colors.sleeve)}${rect(815,242,50,66,colors.sleeve)}</g>`;
}
function frame(dy) {
  return `${rect(110,40,20,510)}${rect(830,40,20,510)}${rect(70,550,820,50)}${profile(lowerDie,colors.metal)}${upper(dy)}`;
}
const upArrow = '<path d="M750 365V320H736L760 290L784 320H770V365Z" fill="#2563EB" stroke="none"/>';
const force = '<path d="M467 85H493V170H515L480 220L445 170H467Z" fill="#2563EB" stroke="none"/><g fill="none" stroke="#2563EB" stroke-width="7"><path d="M290 100C270 120 310 140 290 160S310 190 290 210"/><path d="M670 100C650 120 690 140 670 160S690 190 670 210"/></g>';
const dough = '<path d="M875 504C870 491 881 478 893 480C902 467 921 477 921 485C940 486 945 506 933 514C926 527 904 522 898 519C884 524 873 517 875 504Z" fill="#2563EB"/>';
const assets = [
  { name: 'molding-charge-section', title: '材料置入剖面示意', desc: '上模沿外側導向柱開啟；下模底部放置片材，模具外的團料代表另一種材料選擇。', body: `${frame(-160)}${rect(380,491,200,9,colors.blue,3)}${rect(385,482,190,9,colors.blue,3)}${dough}` },
  { name: 'molding-cure-section', title: '閉模加熱加壓與固化剖面示意', desc: '上模進入下模，外側分模面閉合，藍色材料填滿上下模之間的薄層間隙；箭頭與波紋表示加壓與加熱。', body: `${frame(0)}${profile(material,colors.blue)}${force}` },
  { name: 'molding-demold-section', title: '開模取件剖面示意', desc: '上模沿同一導向位置開啟，藍色固化成型件已離開下模；下模模穴內沒有殘留產品。', body: `${frame(-160)}<g transform="translate(0 -110)">${profile(material,colors.blue)}</g>${upArrow}` },
  { name: 'transfer-assessment-section', title: '模具與設備配合剖面示意', desc: '上下模固定介面貼合壓板，外側導向柱與滑動導套對應；模穴為空。固定件與頂出等細節省略。', body: frame(-160) },
  { name: 'molding-trim-section', title: '薄毛邊修整剖面示意', desc: '刀口作用於產品外緣延伸的薄毛邊，保留成型件本體；旁側小片為移除的多餘部分。', body: `<g transform="translate(-144 -270) scale(1.3)">${profile(material,colors.blue)}<path d="M730 410H770V414H730Z" fill="#2563EB"/><path d="M750 350L782 350L734 412Z" fill="#D7DEE7"/><path d="M750 350L790 278Q794 270 802 275L816 284Q822 289 816 298L782 350Z" fill="#B9C5D4"/>${rect(778,423,11,4,colors.blue,1)}</g>` },
];
await mkdir(out, { recursive: true });
for (const asset of assets) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" width="960" height="640" role="img" aria-labelledby="title desc"><title id="title">${asset.title}</title><desc id="desc">${asset.desc}</desc><rect width="960" height="640" fill="#FFFFFF"/><g stroke="${colors.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${asset.body}</g></svg>\n`;
  await writeFile(path.join(out, `${asset.name}.svg`), svg);
}
console.log(`Generated ${assets.length} diagrams from shared unitless mold profiles.`);
