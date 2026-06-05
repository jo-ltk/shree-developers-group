/**
 * Automated Cloudinary migration checklist.
 * Tests the exact URL shapes the app generates at runtime.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { getSiteAssets, loadEnvFile, root } from "./cloudinary-assets.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnvFile(".env.local");
loadEnvFile(".env");

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dmbsa4gaz";

function cloudinaryImageUrl(publicId, { width, quality = "auto:good" } = {}) {
  const transforms = [
    "f_auto",
    typeof quality === "number" ? `q_${quality}` : `q_${quality}`,
    width ? `w_${width}` : null,
    "c_limit",
    "dpr_auto",
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`;
}

function cloudinaryVideoUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto:good,c_limit/${publicId}.mp4`;
}

function cloudinaryVideoPosterUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_0/${publicId}.jpg`;
}

async function check(label, url) {
  const badCloud = url.includes("dduy8wigb");
  const goodCloud = url.includes(`res.cloudinary.com/${CLOUD}`);
  try {
    const res = await fetch(url, { method: "HEAD" });
    return {
      label,
      url,
      ok: res.ok && goodCloud && !badCloud,
      status: res.status,
      cloudOk: goodCloud && !badCloud,
    };
  } catch (err) {
    return { label, url, ok: false, status: 0, error: err.message, cloudOk: false };
  }
}

const gallery = JSON.parse(
  readFileSync(resolve(root, "src/data/gallery-cloudinary.json"), "utf8"),
);
const blogIds = [
  "shree-blog/sydney-oaks-team-appreciation",
  "shree-blog/elysian-gates-groundwork-begins",
  "shree-blog/sydney-oaks-grand-opening",
  "shree-blog/sydney-oaks-landscaping-progress",
];
const elysianGallery = JSON.parse(
  readFileSync(resolve(root, "src/data/elysian-gates-cloudinary.json"), "utf8"),
);
const walkthroughs = [
  "elysian-gates/jamestown-preview",
  "elysian-gates/vicksburg-foyer-walkthrough",
  "elysian-gates/mcallister-foyer-walkthrough",
];

const checks = [];

// Homepage hero
checks.push(["Hero desktop video", cloudinaryVideoUrl("hero_videos/hero_bg")]);
checks.push(["Hero desktop poster", cloudinaryVideoPosterUrl("hero_videos/hero_bg")]);
checks.push([
  "Hero mobile video",
  cloudinaryVideoUrl("hero_videos/hero_mobile_1778938404986"),
]);

// Visual journey gallery (thumb + full for all 14)
for (const item of gallery) {
  checks.push([
    `Gallery thumb ${item.publicId}`,
    cloudinaryImageUrl(item.publicId, { width: 900, quality: 90 }),
  ]);
  checks.push([
    `Gallery full ${item.publicId}`,
    cloudinaryImageUrl(item.publicId, { width: 2400, quality: 92 }),
  ]);
}

// Blog cards
for (const id of blogIds) {
  checks.push([`Blog card ${id}`, cloudinaryImageUrl(id, { width: 800 })]);
}

// Elysian Gates gallery
for (const item of elysianGallery) {
  checks.push([
    `Elysian thumb ${item.publicId}`,
    cloudinaryImageUrl(item.publicId, { width: 900, quality: 90 }),
  ]);
  checks.push([
    `Elysian full ${item.publicId}`,
    cloudinaryImageUrl(item.publicId, { width: 2400, quality: 92 }),
  ]);
}

// Walkthrough videos (3 used on site)
for (const id of walkthroughs) {
  checks.push([`Walkthrough video ${id}`, cloudinaryVideoUrl(id)]);
  checks.push([`Walkthrough poster ${id}`, cloudinaryVideoPosterUrl(id)]);
}

console.log(`Running ${checks.length} Cloudinary URL checks on ${CLOUD}...\n`);

const results = [];
for (const [label, url] of checks) {
  const result = await check(label, url);
  results.push(result);
  console.log(`${result.ok ? "PASS" : "FAIL"}: ${label} (${result.status})`);
}

const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);

const outPath = resolve(root, "cloudinary-backup/checklist-results.json");
writeFileSync(outPath, JSON.stringify({ cloud: CLOUD, passed, total: results.length, results }, null, 2));

console.log(`\n${passed}/${results.length} passed`);
if (failed.length) {
  console.log("\nFailed:");
  for (const f of failed) console.log(`  - ${f.label}: ${f.status} ${f.error ?? ""}`);
  process.exitCode = 1;
}
