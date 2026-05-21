import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  separator?: boolean; // show left border separator
  light?: boolean;
  /** Fits narrow panels (e.g. site-map sidebar) without viewport-scale overflow */
  compact?: boolean;
  className?: string;
}

export function StatItem({ value, label, separator, light, compact, className }: StatItemProps) {
  const numColor = light ? "text-cream" : "text-dark";
  const labelColor = light ? "text-cream/45" : "text-dark/45";
  const sepColor = light ? "bg-cream/15" : "bg-dark/12";

  return (
    <div className={cn("min-w-0 flex items-stretch", compact ? "gap-3" : "gap-6 md:gap-10", className)}>
      {separator && (
        <div className={cn("w-px self-stretch flex-shrink-0", sepColor)} />
      )}
      <div className="min-w-0">
        <div
          className={cn(
            "leading-none break-words",
            compact ? "text-sm leading-snug" : "responsive-stat-value",
            numColor,
          )}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
          }}
        >
          {value}
        </div>
        <div
          className={cn(
            "mt-1 font-semibold uppercase leading-tight",
            compact
              ? "text-[0.5rem] tracking-[0.12em]"
              : "responsive-stat-label",
            labelColor,
          )}
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
