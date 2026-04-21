import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  letterClassName?: string;
  dotClassName?: string;
  letterStyle?: CSSProperties;
  dotStyle?: CSSProperties;
  variant?: "solid" | "image";
  imageUrl?: string;
};

const defaultImageUrl =
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80";

export function BrandMark({
  className,
  letterClassName,
  dotClassName,
  letterStyle,
  dotStyle,
  variant = "solid",
  imageUrl = defaultImageUrl,
}: BrandMarkProps) {
  const imageFillStyle =
    variant === "image"
      ? {
          backgroundImage: `linear-gradient(180deg, rgba(172, 150, 223, 0.28), rgba(112, 86, 182, 0.5)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }
      : undefined;

  return (
    <span className={cn("relative inline-block align-top text-[12rem] leading-none", className)}>
      <span
        className={cn(
          "block font-display text-[1em] leading-[0.78] tracking-[-0.12em]",
          variant === "solid" && "text-current",
          letterClassName
        )}
        style={{ ...imageFillStyle, ...letterStyle }}
      >
        A
      </span>
      <span
        aria-hidden="true"
        className={cn("absolute rounded-full", variant === "solid" && "bg-current", dotClassName)}
        style={{
          left: "0.74em",
          top: "0.1em",
          width: "0.17em",
          height: "0.17em",
          ...dotStyle,
        }}
      />
    </span>
  );
}
