// Builds favicons, app icons and the social share image from the Heartstead logo.
// Run: node scripts/generate-brand-assets.mjs
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const LOGO = "public/images/logo-transparent.png";
const EMBLEM = { left: 167, top: 155, width: 442, height: 452 }; // house-and-heart mark within the logo
const IVORY = "#FBF6EA";
const BROWN = "#4A1E02";

const emblem = () => sharp(LOGO).extract(EMBLEM);

async function square(size, { background = IVORY, padding = 0.14, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await emblem().resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const base = radius
    ? Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/></svg>`)
    : { create: { width: size, height: size, channels: 4, background } };
  const canvas = radius ? sharp(base) : sharp(base);
  return canvas.composite([{ input: mark, gravity: "center" }]).png().toBuffer();
}

// ICO container holding PNG images (supported by all current browsers).
function ico(pngs) {
  const header = Buffer.alloc(6 + pngs.length * 16);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const favicons = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await square(size, { padding: 0.06, radius: Math.round(size * 0.2) }) })));
await writeFile("src/app/favicon.ico", ico(favicons));
await writeFile("src/app/icon.png", await square(512, { padding: 0.1, radius: 96 }));
await writeFile("src/app/apple-icon.png", await square(180, { padding: 0.14 }));
await writeFile("public/icon-192.png", await square(192, { padding: 0.14 }));
await writeFile("public/icon-512.png", await square(512, { padding: 0.14 }));
await writeFile("public/icon-maskable-512.png", await square(512, { padding: 0.24 }));

// 1200x630 share image: full logo on ivory, with the service area and web address.
const logo = await sharp(LOGO).resize({ width: 820 }).png().toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();
const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${IVORY}"/>
  <rect y="606" width="1200" height="24" fill="${BROWN}"/>
  <text x="600" y="520" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${BROWN}">Live-in and hourly home care · Skillman, New Jersey</text>
  <text x="600" y="566" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="${BROWN}" opacity="0.75">heartsteadhomecarenj.com</text>
</svg>`);
const share = await sharp(text).composite([{ input: logo, top: Math.round((470 - logoHeight) / 2) + 20, left: 190 }]).png().toBuffer();
await writeFile("src/app/opengraph-image.png", share);
await writeFile("src/app/twitter-image.png", share);
await writeFile("src/app/opengraph-image.alt.txt", "Heartstead Home Care logo: compassionate care, comfort at home. Home care in Skillman, New Jersey.");
await writeFile("src/app/twitter-image.alt.txt", "Heartstead Home Care logo: compassionate care, comfort at home. Home care in Skillman, New Jersey.");
console.log("Brand assets written.");
