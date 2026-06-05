import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const root = resolve(__dirname, "..");
export const backupDir = resolve(root, "cloudinary-backup");

export function loadEnvFile(filename) {
  const envPath = resolve(root, filename);
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(root, relativePath), "utf8"));
}

/** All Cloudinary-hosted assets referenced by the site. */
export function getSiteAssets() {
  const gallery = readJson("src/data/gallery-cloudinary.json");
  const blog = readJson("src/data/blog-cloudinary.json");
  const elysianGallery = readJson("src/data/elysian-gates-cloudinary.json");
  const elysianVideos = readJson("src/data/elysian-gates-videos.json");

  const assets = [];

  for (const item of gallery) {
    assets.push({
      publicId: item.publicId,
      resourceType: "image",
      extension: "jpg",
    });
  }

  for (const item of blog) {
    assets.push({
      publicId: item.publicId,
      resourceType: "image",
      extension: "jpg",
    });
  }

  for (const item of elysianGallery) {
    assets.push({
      publicId: item.publicId,
      resourceType: "image",
      extension: "jpg",
    });
  }

  for (const item of elysianVideos) {
    assets.push({
      publicId: item.publicId,
      resourceType: "video",
      extension: "mp4",
    });
  }

  assets.push({
    publicId: "hero_videos/hero_bg",
    resourceType: "video",
    extension: "mp4",
  });
  assets.push({
    publicId: "hero_videos/hero_mobile_1778938404986",
    resourceType: "video",
    extension: "mp4",
  });

  return assets;
}

export function localPathForAsset(asset) {
  return resolve(backupDir, `${asset.publicId}.${asset.extension}`);
}

export function sourceUrl(cloudName, asset) {
  const { publicId, resourceType, extension } = asset;
  if (resourceType === "image") {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${extension}`;
  }
  return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.${extension}`;
}
