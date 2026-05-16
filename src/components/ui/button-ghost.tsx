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
  const textColor = light ? "text-[#F5F0E8]" : "text-[#1C1208]";
  const lineColor = light ? "bg-[#F5F0E8]" : "bg-[#D43F33]";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 px-4 py-1.5 no-underline transition-all duration-300 rounded-full hover:bg-[#1C1208]/5",
        "responsive-btn-text",
        textColor,
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      <span className="uppercase font-bold whitespace-nowrap relative z-10">{children}</span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      {/* Subtle underline that fits the new rounded shape */}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-[60%]",
          lineColor,
        )}
      />
    </Link>
  );
}
