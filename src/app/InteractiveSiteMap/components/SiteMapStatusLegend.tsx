const LEGEND_ITEMS = [
  { short: "Sold", label: "Sold out", fill: "rgba(185, 28, 28, 0.55)", stroke: "#B91C1C" },
  {
    short: "Avail",
    label: "Construction starting",
    fill: "rgba(22, 163, 74, 0.55)",
    stroke: "#15803D",
  },
  { short: "Soon", label: "Upcoming", fill: "rgba(28, 18, 8, 0.28)", stroke: "#1C1208" },
] as const;

function LegendDot({
  fill,
  stroke,
  size = "md",
}: {
  fill: string;
  stroke: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={size === "sm" ? "size-2.5 shrink-0 rounded-full border" : "size-3 shrink-0 rounded-full border-[1.5px]"}
      style={{ backgroundColor: fill, borderColor: stroke }}
    />
  );
}

/** Compact legend — sits below zoom controls (desktop: labeled row, mobile: dot strip). */
export function SiteMapStatusLegend({
  variant,
  mode = "full",
}: {
  variant: "desktop" | "mobile";
  mode?: "full" | "available-sold";
}) {
  const items =
    mode === "available-sold"
      ? LEGEND_ITEMS.filter((item) => item.short === "Sold" || item.short === "Avail")
      : LEGEND_ITEMS;

  if (variant === "mobile") {
    return (
      <div
        data-map-control
        className="flex items-center gap-2.5 rounded-full border border-[#1C1208]/12 bg-[#F5F0E8]/94 px-2.5 py-1.5 shadow-[0_6px_20px_rgba(28,18,8,0.1)] backdrop-blur-md"
        aria-label={
          mode === "available-sold"
            ? "Homesite status: available, sold out"
            : "Homesite status: sold out, construction starting, upcoming"
        }
      >
        {items.map(({ short, label, fill, stroke }) => (
          <span
            key={short}
            className="flex items-center gap-1"
            title={mode === "available-sold" && short === "Avail" ? "Available" : label}
          >
            <LegendDot fill={fill} stroke={stroke} size="sm" />
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#1C1208]/70">
              {mode === "available-sold" && short === "Avail" ? "Open" : short}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      data-map-control
      className="border border-[#1C1208]/12 bg-[#F5F0E8]/95 px-2 py-1.5 shadow-[0_4px_16px_rgba(28,18,8,0.08)] backdrop-blur-sm"
      style={{ borderRadius: 2 }}
      aria-label="Homesite status"
    >
      <ul className="flex flex-col gap-1">
        {items.map(({ short, label, fill, stroke }) => (
          <li key={label} className="flex items-center gap-1.5 whitespace-nowrap">
            <LegendDot fill={fill} stroke={stroke} />
            <span className="text-[9px] font-semibold leading-none text-[#1C1208]/75">
              {mode === "available-sold" && short === "Avail" ? "Available" : label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
