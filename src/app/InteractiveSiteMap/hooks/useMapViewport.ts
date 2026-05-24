"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 3.5;
const ZOOM_STEP = 0.35;
const MIN_PINCH_DISTANCE = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function touchDistance(touches: React.TouchList | TouchList) {
  const a = touches[0];
  const b = touches[1];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function clampOffset(
  x: number,
  y: number,
  scale: number,
  width: number,
  height: number,
) {
  if (scale <= 1 || width <= 0 || height <= 0) {
    return { x: 0, y: 0 };
  }
  const maxX = (width * (scale - 1)) / 2;
  const maxY = (height * (scale - 1)) / 2;
  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  };
}

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type PinchState = {
  distance: number;
  scale: number;
  pending: boolean;
};

export function useMapViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const pinchRef = useRef<PinchState | null>(null);
  const scaleRef = useRef(MIN_SCALE);
  const movedRef = useRef(false);

  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const applyOffset = useCallback(
    (x: number, y: number, nextScale = scale) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setOffset(clampOffset(x, y, nextScale, rect.width, rect.height));
    },
    [scale],
  );

  const setScaleSafe = useCallback((next: number) => {
    const clamped = clamp(next, MIN_SCALE, MAX_SCALE);
    scaleRef.current = clamped;
    setScale(clamped);
  }, []);

  const zoomIn = useCallback(() => {
    setScaleSafe(scaleRef.current + ZOOM_STEP);
  }, [setScaleSafe]);

  const zoomOut = useCallback(() => {
    setScaleSafe(scaleRef.current - ZOOM_STEP);
  }, [setScaleSafe]);

  const reset = useCallback(() => {
    scaleRef.current = MIN_SCALE;
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
  }, []);

  const beginPinch = useCallback((distance: number) => {
    pinchRef.current = {
      distance,
      scale: scaleRef.current,
      pending: distance < MIN_PINCH_DISTANCE,
    };
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-map-control]")) return;

      movedRef.current = false;
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originX: offset.x,
        originY: offset.y,
      };
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [offset.x, offset.y],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (scale <= 1) return;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        movedRef.current = true;
      }
      applyOffset(drag.originX + dx, drag.originY + dy);
    },
    [applyOffset, scale],
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      dragRef.current = null;
      setIsDragging(false);
      if (scaleRef.current <= MIN_SCALE) {
        movedRef.current = false;
      }
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 2) return;
      beginPinch(touchDistance(e.touches));
    },
    [beginPinch],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 2 || !pinchRef.current) return;
      e.preventDefault();

      const distance = touchDistance(e.touches);
      const pinch = pinchRef.current;

      if (pinch.pending) {
        if (distance < MIN_PINCH_DISTANCE) return;
        pinchRef.current = {
          distance,
          scale: scaleRef.current,
          pending: false,
        };
        return;
      }

      if (pinch.distance < MIN_PINCH_DISTANCE) return;

      const ratio = distance / pinch.distance;
      if (!Number.isFinite(ratio)) return;

      setScaleSafe(pinch.scale * ratio);
    },
    [setScaleSafe],
  );

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      pinchRef.current = null;
    }
  }, []);

  const canPan = scale > 1;

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    if (scale <= MIN_SCALE) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset((o) => clampOffset(o.x, o.y, scale, rect.width, rect.height));
  }, [scale]);

  // Desktop: block wheel over map (zoom is buttons-only); allow wheel on controls
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const blockWheel = (e: WheelEvent) => {
      if (!mq.matches) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-map-control]")) return;
      e.preventDefault();
    };

    el.addEventListener("wheel", blockWheel, { passive: false });
    return () => el.removeEventListener("wheel", blockWheel);
  }, []);

  return {
    containerRef,
    scale,
    offset,
    isDragging,
    canPan,
    zoomIn,
    zoomOut,
    reset,
    movedRef,
    viewportProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    transformStyle: {
      transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
      transformOrigin: "center center",
      transition: isDragging ? "none" : "transform 0.2s ease-out",
    },
    cursorClass: canPan
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "",
  };
}
