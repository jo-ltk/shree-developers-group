import elysianGatesCloudinary from "@/data/elysian-gates-cloudinary.json";
import { cloudinaryImageUrl } from "@/lib/cloudinary";

export function getElysianGatesGalleryImages() {
  return elysianGatesCloudinary.map((item) => ({
    publicId: item.publicId,
    thumbUrl: cloudinaryImageUrl(item.publicId, { width: 900, quality: 90 }),
    fullUrl: cloudinaryImageUrl(item.publicId, { width: 2400, quality: 92 }),
    alt: item.title,
    title: item.title,
  }));
}
