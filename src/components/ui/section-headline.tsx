import { cn } from "@/lib/utils";

interface SectionHeadlineProps {
  children: React.ReactNode;
  size?: "hero" | "xl" | "lg" | "md" | "sm";
  light?: boolean;
  className?: string;
  noPeriod?: boolean;
}

export function SectionHeadline({
  children,
  size = "lg",
  light,
  className,
  noPeriod,
}: SectionHeadlineProps) {
  const sizes = {
    hero: "text-[clamp(4rem,8vw,9rem)] leading-[0.92]",
    xl: "!text-[clamp(1.8rem,4.5vw,3.5rem)] !leading-[0.95]",
    lg: "!text-[clamp(1.8rem,4.5vw,3.5rem)] !leading-[0.95]",
    md: "text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05]",
    sm: "text-[clamp(1.2rem,1.8vw,1.6rem)] leading-[1.1]",
  };
  const color = light ? "text-[#F5F0E8]" : "text-[#1C1208]";

  return (
    <h2
      className={cn(
        "tracking-[-0.02em] font-light",
        sizes[size],
        color,
        className,
      )}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 300,
      }}
    >
      {children}
      {!noPeriod && <span className="text-rust">.</span>}
    </h2>
  );
}
