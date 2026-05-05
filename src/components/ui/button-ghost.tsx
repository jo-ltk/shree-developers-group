"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonGhostProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function ButtonGhost({
  href,
  children,
  light,
  className,
}: ButtonGhostProps) {
  const textColor = light ? "text-cream" : "text-dark";
  const lineColor = light ? "bg-cream" : "bg-rust";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 pb-1 no-underline",
        textColor,
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      <span className="uppercase font-bold whitespace-nowrap">{children}</span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      {/* Underline */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full",
          lineColor,
        )}
      />
    </Link>
  );
}
