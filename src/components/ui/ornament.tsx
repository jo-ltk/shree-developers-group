import { cn } from "@/lib/utils";

export function Ornament({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  const lineColor = light ? "bg-cream/15" : "bg-dark/12";
  return (
    <div className={cn("flex items-center gap-3 my-6", className)}>
      <div className={cn("flex-1 h-px", lineColor)} />
      <div
        className="w-[5px] h-[5px] bg-rust flex-shrink-0"
        style={{ transform: "rotate(45deg)" }}
      />
      <div className={cn("flex-1 h-px", lineColor)} />
    </div>
  );
}
