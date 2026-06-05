/**
 * Download all site media from the old Cloudinary account into cloudinary-backup/.
 *
 * Usage: node scripts/download-cloudinary-media.mjs
 *
 * Optional env (defaults to personal account dduy8wigb):
 *   OLD_CLOUDINARY_CLOUD_NAME=dduy8wigb
 */
import { mkdirSync, writeFileSync, createWriteStream, existsSync } from "fs";
import { dirname } from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import {
  backupDir,
  getSiteAssets,
  localPathForAsset,
  loadEnvFile,
  sourceUrl,
} from "./cloudinary-assets.mjs";

loadEnvFile(".env.local");
loadEnvFile(".env");

const OLD_CLOUD =
  process.env.OLD_CLOUDINARY_CLOUD_NAME ?? "dduy8wigb";

const assets = getSiteAssets();
const results = [];

mkdirSync(backupDir, { recursive: true });

console.log(`Downloading ${assets.length} assets from ${OLD_CLOUD} → ${backupDir}\n`);

for (const asset of assets) {
  const dest = localPathForAsset(asset);
  const url = sourceUrl(OLD_CLOUD, asset);

  mkdirSync(dirname(dest), { recursive: true });

  if (existsSync(dest)) {
    console.log(`Skip (exists): ${asset.publicId}`);
    results.push({ ...asset, localPath: dest, url, status: "skipped" });
    continue;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const body = res.body;
    if (!body) {
      throw new Error("Empty response body");
    }

    await pipeline(Readable.fromWeb(body), createWriteStream(dest));
    const sizeMb = (res.headers.get("content-length") ?? 0) / 1_000_000;
    console.log(`OK: ${asset.publicId} (${sizeMb ? `${Number(sizeMb).toFixed(1)} MB` : "saved"})`);
    results.push({ ...asset, localPath: dest, url, status: "downloaded" });
  } catch (err) {
    console.error(`FAIL: ${asset.publicId} — ${err.message}`);
    results.push({
      ...asset,
      localPath: dest,
      url,
      status: "failed",
      error: err.message,
    });
  }
}

const manifestPath = `${backupDir}/manifest.json`;
writeFileSync(
  manifestPath,
  JSON.stringify(
    {
      downloadedAt: new Date().toISOString(),
      sourceCloud: OLD_CLOUD,
      assets: results,
    },
    null,
    2,
  ),
);

const failed = results.filter((r) => r.status === "failed");
const downloaded = results.filter((r) => r.status === "downloaded");
const skipped = results.filter((r) => r.status === "skipped");

console.log(`\nDone: ${downloaded.length} downloaded, ${skipped.length} skipped, ${failed.length} failed`);
console.log(`Manifest: ${manifestPath}`);

if (failed.length > 0) {
  process.exitCode = 1;
}
