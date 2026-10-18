// Branded QR code for heartsteadhomecarenj.com: coffee brown on ivory, rounded modules,
// custom finder markers and the house-and-heart emblem in the centre.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const SITE_URL = "https://heartsteadhomecarenj.com";
const LOGO = fileURLToPath(new URL("../../public/images/logo-transparent.png", import.meta.url));
const EMBLEM = { left: 167, top: 155, width: 442, height: 452 };
const OUT = fileURLToPath(new URL(".", import.meta.url)).replace(/\/$/, "");
const BROWN = "#4A1E02";
const IVORY = "#FBF6EA";
const CARD = "#F3EADB";

const qr = QRCode.create(SITE_URL, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const dark = (r, c) => qr.modules.get(r, c) === 1;
const QUIET = 4;
const UNIT = 10; // SVG units per module
const size = (n + QUIET * 2) * UNIT;

// Centre logo zone: square of modules kept clear (well under the 30% error-correction budget).
const logoModules = Math.round(n * 0.24) | 1;
const logoStart = Math.floor((n - logoModules) / 2);
const inLogo = (r, c) => r >= logoStart - 1 && r < logoStart + logoModules + 1 && c >= logoStart - 1 && c < logoStart + logoModules + 1;
const finders = [[0, 0], [0, n - 7], [n - 7, 0]];
const inFinder = (r, c) => finders.some(([fr, fc]) => r >= fr && r < fr + 7 && c >= fc && c < fc + 7);

const emblemPng = await sharp(LOGO).extract(EMBLEM).resize(600, 600, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const emblemData = `data:image/png;base64,${emblemPng.toString("base64")}`;

function qrSvg() {
  const parts = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (!dark(r, c) || inFinder(r, c) || inLogo(r, c)) continue;
    const x = (c + QUIET) * UNIT, y = (r + QUIET) * UNIT;
    parts.push(`<rect x="${x}" y="${y}" width="${UNIT}" height="${UNIT}" rx="2.6"/>`);
  }
  const finderSvg = finders.map(([fr, fc]) => {
    const x = (fc + QUIET) * UNIT, y = (fr + QUIET) * UNIT;
    return `<rect x="${x + UNIT / 2}" y="${y + UNIT / 2}" width="${UNIT * 6}" height="${UNIT * 6}" rx="${UNIT * 1.8}" fill="none" stroke="${BROWN}" stroke-width="${UNIT}"/>
    <rect x="${x + UNIT * 2}" y="${y + UNIT * 2}" width="${UNIT * 3}" height="${UNIT * 3}" rx="${UNIT * 0.9}" fill="${BROWN}"/>`;
  }).join("\n");
  const lx = (logoStart + QUIET) * UNIT, lw = logoModules * UNIT;
  const pad = UNIT * 0.4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${UNIT * 3}" fill="${IVORY}"/>
  <g fill="${BROWN}">${parts.join("")}</g>
  ${finderSvg}
  <rect x="${lx - pad}" y="${lx - pad}" width="${lw + pad * 2}" height="${lw + pad * 2}" rx="${UNIT * 2.2}" fill="${IVORY}" stroke="${BROWN}" stroke-width="${UNIT * 0.35}"/>
  <image href="${emblemData}" x="${lx + lw * 0.1}" y="${lx + lw * 0.1}" width="${lw * 0.8}" height="${lw * 0.8}"/>
</svg>`;
}

await mkdir(OUT, { recursive: true });
const svg = qrSvg();
await writeFile(`${OUT}/heartstead-qr.svg`, svg);
await sharp(Buffer.from(svg), { density: 600 }).resize(2400, 2400).png().toFile(`${OUT}/heartstead-qr.png`);

// Branded card: logo, QR, call to action and address details. 1600x2000 (4:5), print-friendly.
const W = 1600, H = 2000, Q = 1120;
const qrPng = await sharp(Buffer.from(svg), { density: 600 }).resize(Q, Q).png().toBuffer();
const logo = await sharp(LOGO).resize({ width: 900 }).png().toBuffer();
const { height: logoH } = await sharp(logo).metadata();
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${CARD}"/>
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" rx="56" fill="${IVORY}" stroke="${BROWN}" stroke-opacity="0.18" stroke-width="3"/>
  <text x="${W / 2}" y="1740" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="${BROWN}">Scan to visit our website</text>
  <text x="${W / 2}" y="1812" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="${BROWN}" opacity="0.85">heartsteadhomecarenj.com</text>
  <text x="${W / 2}" y="1872" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="${BROWN}" opacity="0.7">609-910-2632  ·  All 21 counties of New Jersey</text>
</svg>`);
await sharp(card).composite([
  { input: logo, top: 150 + Math.round((300 - logoH) / 2), left: Math.round((W - 900) / 2) },
  { input: qrPng, top: 500, left: Math.round((W - Q) / 2) },
]).png().toFile(`${OUT}/heartstead-qr-card.png`);
console.log(`QR version ${qr.version}, ${n}x${n} modules, logo zone ${logoModules}x${logoModules} modules (${Math.round((logoModules + 2) ** 2 / n ** 2 * 100)}% of code)`);
