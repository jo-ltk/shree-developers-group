"use client";

import type { ReactNode } from "react";
import { useMapViewport } from "../hooks/useMapViewport";
import { MapZoomControls } from "./MapControls";

export function MapViewport({ children }: { children: ReactNode }) {
  const {
    containerRef,
    zoomIn,
    zoomOut,
    reset,
    viewportProps,
    transformStyle,
    cursorClass,
    canPan,
    movedRef,
  } = useMapViewport();

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div
        className={`h-full w-full touch-none select-none ${cursorClass}`}
        style={{ touchAction: "none" }}
        onClickCapture={(e) => {
          if (!movedRef.current) return;

          const target = e.target as Element;
          if (target.closest("[data-map-control]")) {
            movedRef.current = false;
            return;
          }

          // Suppress stray clicks after pan (retargeted to viewport DIV)
          e.stopPropagation();
          e.preventDefault();
          movedRef.current = false;
        }}
        {...viewportProps}
      >
        <div className="h-full w-full will-change-transform" style={transformStyle}>
          {children}
        </div>
      </div>

      {/* Desktop — refined vertical stack, bottom-right */}
      <MapZoomControls
        variant="desktop"
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={reset}
        canReset={canPan}
        className="absolute bottom-8 right-8 z-30 hidden lg:flex"
      />

      {/* Mobile — large touch targets, above lot strip */}
      <MapZoomControls
        variant="mobile"
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={reset}
        canReset={canPan}
        className="absolute bottom-4 right-3 z-30 flex lg:hidden max-[430px]:bottom-3 max-[430px]:right-2"
      />
    </div>
  );
}
