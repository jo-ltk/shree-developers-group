"use client";

import type { ReactNode } from "react";
import { useMapViewport } from "../hooks/useMapViewport";
import { MapZoomControls } from "./MapControls";
import { SiteMapStatusLegend } from "./SiteMapStatusLegend";

export function MapViewport({
  children,
  showStatusLegend = false,
  legendMode = "full",
}: {
  children: ReactNode;
  showStatusLegend?: boolean;
  legendMode?: "full" | "available-sold";
}) {
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

      {/* Desktop — zoom, then legend underneath (bottom-right, off the map) */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-30 hidden flex-col items-end gap-1.5 lg:flex">
        <MapZoomControls
          variant="desktop"
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={reset}
          canReset={canPan}
          className="pointer-events-auto"
        />
        {showStatusLegend && (
          <SiteMapStatusLegend variant="desktop" mode={legendMode} />
        )}
      </div>

      {/* Mobile — zoom pill on top, compact dot strip below */}
      <div className="pointer-events-none absolute bottom-4 right-3 z-30 flex flex-col items-end gap-1.5 lg:hidden max-[430px]:bottom-3 max-[430px]:right-2">
        <MapZoomControls
          variant="mobile"
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={reset}
          canReset={canPan}
          className="pointer-events-auto"
        />
        {showStatusLegend && (
          <SiteMapStatusLegend variant="mobile" mode={legendMode} />
        )}
      </div>
    </div>
  );
}
