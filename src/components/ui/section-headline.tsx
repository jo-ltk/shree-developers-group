import { cn } from "@/lib/utils";

interface SectionHeadlineProps {
  children: React.ReactNode;
  size?: "hero" | "xl" | "lg" | "md";
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
    xl: "text-[clamp(3rem,5.5vw,6rem)] leading-[0.95]",
    lg: "text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.0]",
    md: "text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.05]",
  };
  const color = light ? "text-cream" : "text-dark";

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
