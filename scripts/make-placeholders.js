// Generates the collage-style placeholder cards in assets/cards/.
// Run: node scripts/make-placeholders.js
const fs = require('fs');
const path = require('path');

const cards = [
  { id: 'making-01',     w: 400, h: 300, bg: '#F3B23C', fg: '#1B1B1B', font: 'serif', text: ['A THING', 'I MADE'] },
  { id: 'making-02',     w: 360, h: 440, bg: '#2F6B4F', fg: '#F6E7C8', font: 'serif', text: ['WORK', 'IN', 'PROGRESS'] },
  { id: 'making-03',     w: 380, h: 300, bg: '#E9DFCF', fg: '#C2361F', font: 'hand',  text: ['sketchbook', 'spread'] },
  { id: 'consuming-01',  w: 340, h: 420, bg: '#1F2A44', fg: '#F2C14E', font: 'serif', text: ['NOW', 'READING'] },
  { id: 'consuming-02',  w: 440, h: 300, bg: '#8FB8D9', fg: '#14213D', font: 'hand',  text: ['on repeat', 'lately'] },
  { id: 'references-01', w: 380, h: 300, bg: '#F6F1E6', fg: '#1B1B1B', font: 'serif', text: ['A LINE', 'I LIVE BY'] },
  { id: 'references-02', w: 340, h: 340, bg: '#E8572A', fg: '#FFF4E0', font: 'sans',  text: ['NOTHING', 'CHANGES IF', 'NOTHING', 'CHANGES'] },
  { id: 'references-03', w: 420, h: 280, bg: '#C9B48A', fg: '#7A1E14', font: 'hand',  text: ['advice I', 'keep coming', 'back to'] },
  { id: 'taste-01',      w: 320, h: 380, bg: '#F2A7B8', fg: '#7A1238', font: 'sans',  text: ['COLOUR', 'OF THE', 'MONTH'] },
  { id: 'taste-02',      w: 400, h: 300, bg: '#3C3A8F', fg: '#F7E9D7', font: 'hand',  text: ['an object', 'i love'] },
];

const fonts = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "'Arial Black', Arial, Helvetica, sans-serif",
  hand: "'Comic Sans MS', 'Marker Felt', cursive",
};

for (const c of cards) {
  const size = c.font === 'hand' ? 40 : 38;
  const lh = size * 1.08;
  const startY = c.h / 2 - ((c.text.length - 1) * lh) / 2 + size * 0.35;
  const lines = c.text
    .map((t, i) => `<text x="${c.w / 2}" y="${(startY + i * lh).toFixed(1)}">${t}</text>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.w} ${c.h}" width="${c.w}" height="${c.h}">
<defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .18 0"/></filter></defs>
<rect width="100%" height="100%" fill="${c.bg}"/>
<rect width="100%" height="100%" filter="url(#grain)"/>
<g fill="${c.fg}" font-family="${fonts[c.font]}" font-size="${size}" font-weight="${c.font === 'hand' ? 400 : 700}" text-anchor="middle" letter-spacing="${c.font === 'sans' ? -1 : 0}">${lines}</g>
<text x="14" y="${c.h - 14}" fill="${c.fg}" opacity=".55" font-family="monospace" font-size="13">placeholder · ${c.id}</text>
</svg>
`;
  fs.writeFileSync(path.join(__dirname, '..', 'assets', 'cards', `${c.id}.svg`), svg);
}
console.log(`wrote ${cards.length} placeholders`);
