import { cn } from "@/lib/utils";

interface BodyTextProps {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
  light?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function BodyText({
  children,
  size = "md",
  light,
  className,
  style,
}: BodyTextProps) {
  const sizes = {
    lg: "text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.75]",
    md: "text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.65]",
    sm: "text-[clamp(0.85rem,1vw,0.95rem)] leading-[1.6]",
  };
  const color = light ? "text-cream/80" : "text-dark/70";

  return (
    <p
      className={cn(sizes[size], color, className)}
      style={{ 
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        ...style 
      }}
    >
      {children}
    </p>
  );
}
