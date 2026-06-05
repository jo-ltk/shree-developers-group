/**
 * Measure site-map asset payload sizes for performance reporting.
 * Usage: node scripts/measure-site-map-payload.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function fileSize(path) {
  return statSync(path).size;
}

function referencedImages(svgPath) {
  const markup = readFileSync(svgPath, "utf8");
  return [...markup.matchAll(/\/images\/site-maps\/[^"']+/g)].map((m) => m[0]);
}

const maps = [
  { name: "Sydney Oaks", svg: "public/svg/siteMap-final.svg" },
  { name: "Elysian Gates", svg: "public/svg/elysian-gates.svg" },
];

for (const map of maps) {
  const svgPath = resolve(root, map.svg);
  const svgBytes = fileSize(svgPath);
  const images = [...new Set(referencedImages(svgPath))];
  let imageBytes = 0;
  for (const href of images) {
    imageBytes += fileSize(resolve(root, "public", href.replace(/^\//, "")));
  }
  console.log(
    JSON.stringify({
      map: map.name,
      svgKb: Math.round(svgBytes / 1024),
      imageCount: images.length,
      imagesKb: Math.round(imageBytes / 1024),
      totalKb: Math.round((svgBytes + imageBytes) / 1024),
    }),
  );
}

console.log(
  JSON.stringify({
    note: "Original Sydney Oaks SVG was ~14.9 MB; Elysian Gates was ~10.1 MB with embedded base64 PNGs.",
  }),
);
