"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonPrimaryProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ButtonPrimary({
  href,
  children,
  className,
}: ButtonPrimaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-[46px] sm:h-[52px] items-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8",
        "!text-white no-underline overflow-hidden",
        "transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)]",
        "responsive-btn-text",
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
      <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

      <span className="uppercase font-bold whitespace-nowrap relative z-10">
        {children}
      </span>

      {/* Arrow box */}
      <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
