/**
 * Verify all site assets are reachable on the target Cloudinary account.
 * Usage: node scripts/verify-cloudinary-media.mjs
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  getSiteAssets,
  loadEnvFile,
  root,
  sourceUrl,
} from "./cloudinary-assets.mjs";

loadEnvFile(".env.local");
loadEnvFile(".env");

const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
  process.env.CLOUDINARY_CLOUD_NAME ??
  "dmbsa4gaz";

const assets = getSiteAssets();
const results = [];

console.log(`Verifying ${assets.length} assets on ${cloudName}\n`);

for (const asset of assets) {
  const url = sourceUrl(cloudName, asset);
  try {
    const res = await fetch(url, { method: "HEAD" });
    const ok = res.ok;
    console.log(`${ok ? "OK" : "FAIL"}: ${asset.publicId} (${res.status})`);
    results.push({
      publicId: asset.publicId,
      url,
      status: ok ? "verified" : "missing",
      httpStatus: res.status,
    });
  } catch (err) {
    console.error(`FAIL: ${asset.publicId} — ${err.message}`);
    results.push({
      publicId: asset.publicId,
      url,
      status: "error",
      error: err.message,
    });
  }
}

const outPath = resolve(root, "cloudinary-backup/verify-results.json");
writeFileSync(outPath, JSON.stringify(results, null, 2));

const verified = results.filter((r) => r.status === "verified");
const failed = results.filter((r) => r.status !== "verified");

console.log(`\nVerified: ${verified.length}/${assets.length}`);
console.log(`Results: ${outPath}`);

if (failed.length > 0) {
  process.exitCode = 1;
}
