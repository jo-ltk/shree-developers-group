"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  variant?: "white" | "black";
  alt?: string;
  priority?: boolean;
};

const logoSrc = {
  white: "/images/logo-white.png",
  black: "/images/logo-black.png",
} as const;

export function BrandMark({
  className,
  imageClassName,
  variant = "white",
  alt = "Shree Developers Group logo",
  priority = false,
}: BrandMarkProps) {
  return (
    <div className={cn("relative inline-block h-20 w-[12rem]", className)}>
      <Image
        src={logoSrc[variant]}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-contain", imageClassName)}
        sizes="(max-width: 640px) 10rem, (max-width: 1024px) 14rem, 18rem"
      />
    </div>
  );
}
