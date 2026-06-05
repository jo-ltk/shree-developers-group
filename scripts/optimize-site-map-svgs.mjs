/**
 * Extract embedded base64 images from interactive site-map SVGs,
 * compress them to WebP, minify with SVGO, and precompute lot hotspots.
 *
 * Usage: node scripts/optimize-site-map-svgs.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";
import { Window } from "happy-dom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svgDir = resolve(root, "public/svg");
const imageOutDir = resolve(root, "public/images/site-maps");
const hotspotOutDir = resolve(root, "src/app/InteractiveSiteMap/data");

const MAPS = [
  { svg: "elysian-gates.svg", slug: "elysian-gates", mapId: "elysian-gates" },
  { svg: "siteMap-final.svg", slug: "sydney-oaks", mapId: "sydney-oaks" },
];

const BASE64_RE =
  /xlink:href="data:image\/(png|jpeg|jpg);base64,([^"]+)"/gi;

function extractHotspots(mapId, svgMarkup) {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = svgMarkup;

  const svg = document.querySelector("svg");
  if (!svg) return [];

  const viewBoxAttr = svg.getAttribute("viewBox");
  const viewBox = viewBoxAttr
    ? viewBoxAttr.trim().split(/\s+/).map(Number)
    : [0, 0, 3392, 2160];

  const ringRadius = Math.max(8, Math.round(viewBox[2] * 0.006));
  const hitPadding = Math.max(4, Math.round(viewBox[2] * 0.0025));

  const hotspots = Array.from(document.querySelectorAll('g[id*="lot-"]'))
    .map((group) => {
      const idMatch = group.id.match(/lot-(\d+)/i);
      const id = idMatch ? Number.parseInt(idMatch[1], 10) : 0;
      if (!id) return null;

      const bbox = group.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const hitSize = ringRadius * 2 + hitPadding * 2;

      return {
        id,
        x: cx - hitSize / 2,
        y: cy - hitSize / 2,
        width: hitSize,
        height: hitSize,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  window.close();
  return hotspots;
}

async function optimizeMap({ svg, slug, mapId }) {
  const inputPath = resolve(svgDir, svg);
  let markup = readFileSync(inputPath, "utf8");
  const originalBytes = Buffer.byteLength(markup, "utf8");

  mkdirSync(imageOutDir, { recursive: true });

  let imageIndex = 0;
  const replacements = [];

  for (const match of markup.matchAll(BASE64_RE)) {
    const [full, , base64Data] = match;
    const buffer = Buffer.from(base64Data, "base64");
    const image = sharp(buffer);
    const meta = await image.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    imageIndex += 1;
    const fileName = `${slug}-${imageIndex}.webp`;
    const outPath = resolve(imageOutDir, fileName);
    const publicPath = `/images/site-maps/${fileName}`;

    await image.webp({ quality: 82, effort: 6 }).toFile(outPath);

    replacements.push({
      full,
      publicPath,
      originalBytes: buffer.length,
      optimizedBytes: readFileSync(outPath).length,
      width,
      height,
    });
  }

  for (const { full, publicPath } of replacements.sort(
    (a, b) => b.full.length - a.full.length,
  )) {
    markup = markup.replace(
      full,
      `href="${publicPath}" xlink:href="${publicPath}"`,
    );
  }

  const hotspots = extractHotspots(mapId, markup);
  writeFileSync(
    resolve(hotspotOutDir, `${mapId}-hotspots.json`),
    `${JSON.stringify(hotspots)}\n`,
    "utf8",
  );

  const svgoResult = optimizeSvg(markup, {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            cleanupIds: false,
          },
        },
      },
      "removeMetadata",
      "removeComments",
      "removeTitle",
      "removeDesc",
      "removeEditorsNSData",
    ],
  });

  markup = svgoResult.data;
  writeFileSync(inputPath, markup, "utf8");

  const optimizedSvgBytes = Buffer.byteLength(markup, "utf8");
  return {
    svg,
    slug,
    mapId,
    originalBytes,
    optimizedSvgBytes,
    hotspotCount: hotspots.length,
    images: replacements,
  };
}

const results = [];
for (const map of MAPS) {
  results.push(await optimizeMap(map));
}

console.log(JSON.stringify(results, null, 2));
