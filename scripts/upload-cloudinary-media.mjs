/**
 * Upload media from cloudinary-backup/ to the new Cloudinary account.
 * Run download-cloudinary-media.mjs first.
 *
 * Usage: node scripts/upload-cloudinary-media.mjs
 *
 * Requires new account credentials in .env or .env.local:
 *   CLOUDINARY_URL  (or CLOUDINARY_CLOUD_NAME + API_KEY + API_SECRET)
 */
import { v2 as cloudinary } from "cloudinary";
import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  backupDir,
  getSiteAssets,
  localPathForAsset,
  loadEnvFile,
  root,
} from "./cloudinary-assets.mjs";

loadEnvFile(".env.local");
loadEnvFile(".env");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else if (process.env.CLOUDINARY_URL) {
  cloudinary.config();
} else {
  console.error(
    "Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME + API_KEY + API_SECRET in .env",
  );
  process.exit(1);
}

const targetCloud =
  process.env.CLOUDINARY_CLOUD_NAME ??
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
  "dmbsa4gaz";

const assets = getSiteAssets();
const results = [];

console.log(`Uploading ${assets.length} assets to ${targetCloud}\n`);

for (const asset of assets) {
  const filePath = localPathForAsset(asset);

  if (!existsSync(filePath)) {
    console.warn(`Skip (missing file): ${asset.publicId}`);
    results.push({ ...asset, status: "missing" });
    continue;
  }

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      public_id: asset.publicId,
      resource_type: asset.resourceType,
      overwrite: true,
    });
    console.log(`OK: ${asset.publicId}`);
    results.push({
      publicId: res.public_id,
      url: res.secure_url,
      status: "uploaded",
    });
  } catch (err) {
    console.error(`FAIL: ${asset.publicId} — ${err.message}`);
    results.push({
      ...asset,
      status: "failed",
      error: err.message,
    });
  }
}

const outPath = resolve(root, "cloudinary-backup/upload-results.json");
writeFileSync(outPath, JSON.stringify(results, null, 2));

const failed = results.filter((r) => r.status === "failed");
const uploaded = results.filter((r) => r.status === "uploaded");
const missing = results.filter((r) => r.status === "missing");

console.log(`\nDone: ${uploaded.length} uploaded, ${missing.length} missing, ${failed.length} failed`);
console.log(`Results: ${outPath}`);

if (failed.length > 0 || missing.length > 0) {
  process.exitCode = 1;
}
