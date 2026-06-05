/**
 * Re-upload blog card images to Cloudinary.
 * Sources are not in git — place JPEGs under public/images/blog/ before running.
 */
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(filename) {
  const envPath = resolve(root, filename);
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const images = [
  {
    file: "public/images/blog/elysian-gates-groundwork-begins.jpg",
    publicId: "shree-blog/elysian-gates-groundwork-begins",
  },
  {
    file: "public/images/blog/sydney-oaks-team-appreciation.jpg",
    publicId: "shree-blog/sydney-oaks-team-appreciation",
  },
  {
    file: "public/images/blog/sydney-oaks-grand-opening.jpg",
    publicId: "shree-blog/sydney-oaks-grand-opening",
  },
  {
    file: "public/images/blog/sydney-oaks-landscaping-progress.jpg",
    publicId: "shree-blog/sydney-oaks-landscaping-progress",
  },
];

const results = [];
for (const { file, publicId } of images) {
  const path = resolve(root, file);
  if (!existsSync(path)) {
    console.warn(`Skip (missing): ${file}`);
    continue;
  }
  const res = await cloudinary.uploader.upload(path, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  results.push({
    publicId: res.public_id,
    url: res.secure_url,
  });
  console.log(`Uploaded ${publicId}`);
}

console.log(JSON.stringify(results, null, 2));
