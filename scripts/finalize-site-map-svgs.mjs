import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { optimize as optimizeSvg } from "svgo";
import { Window } from "happy-dom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const MAPS = [
  { svg: "elysian-gates.svg", mapId: "elysian-gates" },
  { svg: "siteMap-final.svg", mapId: "sydney-oaks" },
];

function extractHotspots(svgMarkup) {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = svgMarkup;
  const svg = document.querySelector("svg");
  if (!svg) {
    window.close();
    return [];
  }

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

for (const { svg, mapId } of MAPS) {
  const path = resolve(root, "public/svg", svg);
  let markup = readFileSync(path, "utf8");
  const before = markup.length;

  writeFileSync(
    resolve(root, "src/app/InteractiveSiteMap/data", `${mapId}-hotspots.json`),
    `${JSON.stringify(extractHotspots(markup))}\n`,
  );

  markup = optimizeSvg(markup, {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: { removeViewBox: false, cleanupIds: false },
        },
      },
      "removeMetadata",
      "removeComments",
    ],
  }).data;

  writeFileSync(path, markup);
  console.log(`${svg}: ${before} -> ${markup.length} bytes`);
}
