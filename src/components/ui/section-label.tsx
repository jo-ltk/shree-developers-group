import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  counter?: string; // e.g. "03 / 08"
  className?: string;
  light?: boolean; // true = cream text on dark sections
}

export function SectionLabel({
  children,
  counter,
  className,
  light,
}: SectionLabelProps) {
  const color = light ? "text-cream/70" : "text-rust";
  const textColor = light ? "text-cream/60" : "text-dark/60";

  return (
    <div className={cn("flex items-start gap-4 mb-6 md:mb-8", className)}>
      {counter && (
        <span
          className={cn("font-semibold tabular-nums shrink-0", color)}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
          }}
        >
          {counter}
        </span>
      )}
      <span
        className={cn("font-semibold uppercase block", textColor)}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
        }}
      >
        {children}
      </span>
    </div>
  );
}
