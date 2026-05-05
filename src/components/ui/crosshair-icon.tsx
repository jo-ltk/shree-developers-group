// From SHREE_DEVELOPERSGROUP_PREMIUM_SYSTEM.md § 5 — CrosshairIcon

export function CrosshairIcon({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  const color = light ? "#F5F0E899" : "#D43F3399";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className}>
      <line x1="8" y1="0" x2="8" y2="16" stroke={color} strokeWidth="1" />
      <line x1="0" y1="8" x2="16" y2="8" stroke={color} strokeWidth="1" />
    </svg>
  );
}
