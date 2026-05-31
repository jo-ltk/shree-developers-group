const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dduy8wigb";

type CloudinaryImageOptions = {
  width?: number;
  quality?: number | "auto" | "auto:best" | "auto:good";
};

/** Build a Cloudinary delivery URL with sharp, modern formats (WebP/AVIF). */
export function cloudinaryImageUrl(
  publicId: string,
  { width, quality = "auto:good" }: CloudinaryImageOptions = {},
): string {
  const transforms = [
    "f_auto",
    typeof quality === "number" ? `q_${quality}` : `q_${quality}`,
    width ? `w_${width}` : null,
    "c_limit",
    "dpr_auto",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

type CloudinaryVideoOptions = {
  width?: number;
  quality?: "auto" | "auto:good" | "auto:best";
};

/** Build a Cloudinary video delivery URL. */
export function cloudinaryVideoUrl(
  publicId: string,
  { width, quality = "auto:good" }: CloudinaryVideoOptions = {},
): string {
  const transforms = [
    "f_auto",
    `q_${quality}`,
    width ? `w_${width}` : null,
    "c_limit",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.mp4`;
}

/** Poster frame URL for a Cloudinary-hosted video. */
export function cloudinaryVideoPosterUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${publicId}.jpg`;
}
