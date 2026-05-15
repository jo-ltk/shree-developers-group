import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  separator?: boolean; // show left border separator
  light?: boolean;
}

export function StatItem({ value, label, separator, light }: StatItemProps) {
  const numColor = light ? "text-cream" : "text-dark";
  const labelColor = light ? "text-cream/45" : "text-dark/45";
  const sepColor = light ? "bg-cream/15" : "bg-dark/12";

  return (
    <div className="flex items-stretch gap-6 md:gap-10">
      {separator && (
        <div className={cn("w-px self-stretch flex-shrink-0", sepColor)} />
      )}
      <div>
        <div
          className={cn("leading-none responsive-stat-value", numColor)}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
          }}
        >
          {value}
        </div>
        <div
          className={cn(
            "uppercase mt-1 font-semibold responsive-stat-label",
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
