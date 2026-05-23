import galleryCloudinary from "@/data/gallery-cloudinary.json";
import { cloudinaryImageUrl } from "@/lib/cloudinary";

export const visualJourneyGalleryTitles = [
  "Refined Vision",
  "Modern Living",
  "Elegant Spaces",
  "Serene Sanctuaries",
  "Grand Arrivals",
  "Luxe Textures",
  "Bespoke Design",
  "Urban Oasis",
  "Timeless Style",
  "Sophisticated Comfort",
  "Pure Aesthetics",
  "Living Art",
  "Exquisite Detail",
  "Final Vision",
] as const;

export function getVisualJourneyGalleryImages() {
  return galleryCloudinary.map((item, i) => ({
    publicId: item.publicId,
    thumbUrl: cloudinaryImageUrl(item.publicId, { width: 900, quality: 90 }),
    fullUrl: cloudinaryImageUrl(item.publicId, { width: 2400, quality: 92 }),
    alt: `Refined living interior ${i + 1}`,
    title: visualJourneyGalleryTitles[i],
  }));
}
