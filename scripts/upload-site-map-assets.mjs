/**
 * Upload optimized site-map backgrounds to Cloudinary (optional CDN layer).
 * Requires CLOUDINARY credentials in .env.
 *
 * Usage: node scripts/upload-site-map-assets.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: resolve(root, ".env") });

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ??
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
} else if (cloudName) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  console.error("Missing Cloudinary credentials in .env");
  process.exit(1);
}

const imageDir = resolve(root, "public/images/site-maps");
const svgDir = resolve(root, "public/svg");

const ASSETS = [
  ...readdirSync(imageDir)
    .filter((file) => file.endsWith(".webp"))
    .map((file) => ({
      file,
      publicId: `site-maps/${file.replace(/\.webp$/, "")}`,
      resourceType: "image",
      folder: imageDir,
    })),
  {
    file: "elysian-gates.svg",
    publicId: "site-maps/elysian-gates",
    resourceType: "raw",
    folder: svgDir,
  },
  {
    file: "siteMap-final.svg",
    publicId: "site-maps/sydney-oaks",
    resourceType: "raw",
    folder: svgDir,
  },
];

const results = [];

for (const asset of ASSETS) {
  const baseDir = asset.folder ?? imageDir;
  const filePath = resolve(baseDir, asset.file);
  const res = await cloudinary.uploader.upload(filePath, {
    public_id: asset.publicId,
    resource_type: asset.resourceType,
    overwrite: true,
    invalidate: true,
  });
  results.push({
    file: asset.file,
    publicId: asset.publicId,
    url: res.secure_url,
    bytes: res.bytes,
  });
  console.log(`Uploaded ${asset.file} -> ${res.secure_url}`);
}

const outPath = resolve(root, "src/data/site-maps-cloudinary.json");
writeFileSync(outPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath}`);
console.log(
  "Set NEXT_PUBLIC_SITE_MAP_ELYSIAN_SVG=site-maps/elysian-gates and NEXT_PUBLIC_SITE_MAP_SYDNEY_SVG=site-maps/sydney-oaks to enable CDN delivery.",
);
