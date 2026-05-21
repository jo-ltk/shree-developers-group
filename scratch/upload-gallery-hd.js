require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const galleryDir = path.join(__dirname, "..", "public", "images", "gallery");
const downloadsDir =
  "C:\\Users\\joelt\\Downloads\\drive-download-20260516T121036Z-3-001";

function getSourceFiles() {
  if (fs.existsSync(galleryDir)) {
    return fs
      .readdirSync(galleryDir)
      .filter((f) => /^gallery-\d+\.jpg$/i.test(f))
      .sort()
      .map((f) => path.join(galleryDir, f));
  }
  return fs
    .readdirSync(downloadsDir)
    .filter((f) => f.endsWith(".jpg"))
    .sort()
    .map((f) => path.join(downloadsDir, f));
}

async function main() {
  const files = getSourceFiles();
  if (!files.length) {
    console.error("No gallery images found to upload.");
    process.exit(1);
  }

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const num = String(i + 1).padStart(2, "0");
    const publicId = `shree-gallery/gallery-${num}`;

    console.log(`Uploading ${path.basename(file)} -> ${publicId}...`);

    const result = await cloudinary.uploader.upload(file, {
      folder: "shree-gallery",
      public_id: `gallery-${num}`,
      overwrite: true,
      invalidate: true,
      resource_type: "image",
    });

    results.push({
      index: i + 1,
      publicId: result.public_id,
      url: result.secure_url,
    });

    console.log(`  OK: ${result.secure_url}`);
  }

  const outPath = path.join(__dirname, "..", "src", "data", "gallery-cloudinary.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
