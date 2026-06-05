"use client";

import type { ReactNode } from "react";
import { memo } from "react";

import type { MapViewBox } from "../types/site-map";
import { SITE_MAP_CANVAS } from "../utils/site-map-constants";

function SiteMapCanvasInner({
  viewBox = SITE_MAP_CANVAS.viewBox,
  children,
}: {
  viewBox?: MapViewBox;
  children: ReactNode;
}) {
  const { x, y, width, height } = viewBox;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F5F0E8]">
      <svg
        viewBox={`${x} ${y} ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full max-h-full max-w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {children}
      </svg>
    </div>
  );
}

export const SiteMapCanvas = memo(SiteMapCanvasInner);
