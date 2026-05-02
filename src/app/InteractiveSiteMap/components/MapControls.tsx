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
      className="grid size-10 place-items-center border border-black bg-white text-black"
    >
      {children}
    </button>
  );
}

export function MapControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute left-4 top-4 z-30 flex items-center gap-2">
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
