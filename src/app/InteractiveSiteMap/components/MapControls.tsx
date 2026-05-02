"use client";

import { LocateFixed, Minus, Plus } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

function ControlButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-11 place-items-center border border-[rgba(183,170,152,0.45)] bg-[rgba(250,248,243,0.88)] text-[var(--text-primary)] backdrop-blur-md transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {children}
    </button>
  );
}

export function MapControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-4 right-4 z-30 flex flex-col items-center gap-2 rounded-[8px] border border-[rgba(183,170,152,0.35)] bg-[rgba(250,248,243,0.62)] p-2 backdrop-blur-md lg:bottom-auto lg:left-4 lg:right-auto lg:top-4 lg:flex-row">
      <ControlButton label="Zoom in" onClick={() => zoomIn(0.35, 120)}>
        <Plus className="size-4" />
      </ControlButton>
      <ControlButton label="Zoom out" onClick={() => zoomOut(0.35, 120)}>
        <Minus className="size-4" />
      </ControlButton>
      <ControlButton label="Reset map" onClick={() => resetTransform(120)}>
        <LocateFixed className="size-4" />
      </ControlButton>
    </div>
  );
}
