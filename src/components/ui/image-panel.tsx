"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePanelProps {
  src: string;
  alt: string;
  aspectRatio?: string; // default 'aspect-[4/5]'
  overlay?: boolean; // dark green bg-[#1A2C1E] panel behind
  className?: string;
  counter?: string; // '01', '02' etc
  label?: string; // 'MODELING TASTE'
  priority?: boolean;
}

export function ImagePanel({
  src,
  alt,
  aspectRatio = "aspect-[4/5]",
  overlay,
  className,
  counter,
  label,
  priority,
}: ImagePanelProps) {
  return (
    <div className={cn("relative group overflow-hidden", className)}>
      {/* Optional dark panel offset */}
      {overlay && (
        <div className="absolute -inset-2 bg-[#1A2C1E] -z-10 translate-x-3 translate-y-3" />
      )}

      {/* Counter + label */}
      {(counter || label) && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
          {counter && (
            <span
              className="text-[#F5F0E8] font-semibold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
              }}
            >
              {counter}
            </span>
          )}
          {label && (
            <span
              className={cn(
                "uppercase",
                label.includes("SOLD") ? "font-bold text-[#FCA5A5]" : "text-[#F5F0E8]",
              )}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      <div className={cn("relative w-full overflow-hidden bg-[#1C1208]/5", aspectRatio)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
