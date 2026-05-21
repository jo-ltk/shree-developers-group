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
