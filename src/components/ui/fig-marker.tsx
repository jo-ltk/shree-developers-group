import { cn } from "@/lib/utils";

export function FigMarker({ fig, label, className, light }: { fig: string; label?: string; className?: string; light?: boolean }) {
  const textColor = light ? "text-cream" : "text-dark";
  const lineColor = light ? "bg-cream/40" : "bg-dark/40";
  
  return (
    <div className={cn("flex items-center gap-3 opacity-20", className)}>
      <div
        className={textColor}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
        }}
      >
        {fig}
      </div>
      {label && (
        <>
          <div className={cn("h-px w-8", lineColor)} />
          <div
            className={cn("uppercase", textColor)}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
            }}
          >
            {label}
          </div>
        </>
      )}
    </div>
  );
}
