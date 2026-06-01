import { v2 as cloudinary } from "cloudinary";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const images = [
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
  const res = await cloudinary.uploader.upload(resolve(root, file), {
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
