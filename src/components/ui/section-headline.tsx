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
    hero: "text-[clamp(3.5rem,8vw,8rem)] leading-[0.95]",
    xl:   "!text-6xl md:text-7xl leading-[1.05]",
    lg:   "text-[clamp(1.9rem,3.5vw,3rem)]   leading-[1.12]",
    md:   "text-[clamp(1.4rem,2.5vw,2.2rem)] leading-[1.18]",
    sm:   "text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.25]",
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
