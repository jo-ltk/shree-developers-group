import { cn } from "@/lib/utils";

interface SectionHeadlineProps {
  children: React.ReactNode;
  size?: "hero" | "xl" | "lg" | "md" | "sm";
  light?: boolean;
  className?: string;
  noPeriod?: boolean;
  style?: React.CSSProperties;
}

export function SectionHeadline({
  children,
  size = "lg",
  light,
  className,
  noPeriod,
  style,
}: SectionHeadlineProps) {
  const sizes = {
    hero: "!text-[clamp(3rem,7vw,7rem)] leading-[0.95]",

xl:   "!text-3xl sm:!text-4xl md:!text-5xl leading-[1.05]",

lg:   "!text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.12]",

md:   "!text-[clamp(1.2rem,2vw,1.9rem)] leading-[1.18]",

sm:   "!text-[clamp(1rem,1.5vw,1.3rem)] leading-[1.25]",
  };
  const color = light ? "text-[#F5F0E8]" : "text-[#1C1208]";

  return (
    <h2
      className={cn(
        "tracking-tight not-italic",
        sizes[size],
        color,
        className,
      )}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
      {!noPeriod && <span className="text-rust">.</span>}
    </h2>
  );
}
