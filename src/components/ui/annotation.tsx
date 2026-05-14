import { cn } from "@/lib/utils";

// From SHREE_DEVELOPERSGROUP_PREMIUM_SYSTEM.md § 5 — Annotation
// The small `fig. 08`, location, or stat-label style micro-text.
// Always uppercase, wide tracking, tiny — technical & precise.

export function Annotation({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  const color = light ? "text-cream/60" : "text-dark/50";

  return (
    <span
      className={cn("uppercase tracking-[0.3em] block", color, className)}
      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem" }}
    >
      {children}
    </span>
  );
}
