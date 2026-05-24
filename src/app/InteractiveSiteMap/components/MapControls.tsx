"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LocateFixed, Minus, Plus } from "lucide-react";

function ControlButton({
  label,
  children,
  onClick,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      data-map-control
      aria-label={label}
      title={label}
      onClick={onClick}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function MapZoomControls({
  variant,
  onZoomIn,
  onZoomOut,
  onReset,
  canReset = false,
  className = "",
}: {
  variant: "desktop" | "mobile";
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  canReset?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (variant === "desktop") {
    return (
      <motion.div
        data-map-control
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
        className={`flex-col overflow-hidden border border-[#1C1208]/12 bg-[#F5F0E8]/95 shadow-[0_4px_24px_rgba(28,18,8,0.08)] backdrop-blur-sm ${className}`}
        style={{ borderRadius: 2 }}
      >
        <ControlButton
          label="Zoom in"
          onClick={onZoomIn}
          className="grid size-9 place-items-center text-[#1C1208] transition-colors duration-200 hover:bg-[#D43F33] hover:text-white"
        >
          <Plus className="size-3.5" strokeWidth={1.75} />
        </ControlButton>
        <div className="h-px w-full bg-[#1C1208]/10" />
        <ControlButton
          label="Zoom out"
          onClick={onZoomOut}
          className="grid size-9 place-items-center text-[#1C1208] transition-colors duration-200 hover:bg-[#D43F33] hover:text-white"
        >
          <Minus className="size-3.5" strokeWidth={1.75} />
        </ControlButton>
        {canReset && (
          <>
            <div className="h-px w-full bg-[#1C1208]/10" />
            <ControlButton
              label="Reset map view"
              onClick={onReset}
              className="grid size-9 place-items-center text-[#1C1208]/70 transition-colors duration-200 hover:bg-[#1C1208]/5 hover:text-[#1C1208]"
            >
              <LocateFixed className="size-3.5" strokeWidth={1.75} />
            </ControlButton>
          </>
        )}
      </motion.div>
    );
  }

  /* Mobile — pill cluster, 44px+ touch targets */
  return (
    <motion.div
      data-map-control
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
      className={`items-center gap-0.5 overflow-hidden rounded-full border border-[#1C1208]/15 bg-[#F5F0E8]/92 p-1 shadow-[0_8px_32px_rgba(28,18,8,0.12)] backdrop-blur-md ${className}`}
    >
      <ControlButton
        label="Zoom out"
        onClick={onZoomOut}
        className="grid size-11 place-items-center rounded-full text-[#1C1208] active:bg-[#D43F33] active:text-white"
      >
        <Minus className="size-5" strokeWidth={2} />
      </ControlButton>
      {canReset && (
        <ControlButton
          label="Reset map view"
          onClick={onReset}
          className="grid size-9 place-items-center rounded-full text-[#1C1208]/50 active:bg-[#1C1208]/8 active:text-[#1C1208]"
        >
          <LocateFixed className="size-4" strokeWidth={2} />
        </ControlButton>
      )}
      <ControlButton
        label="Zoom in"
        onClick={onZoomIn}
        className="grid size-11 place-items-center rounded-full bg-[#1C1208] text-[#F5F0E8] active:bg-[#D43F33]"
      >
        <Plus className="size-5" strokeWidth={2} />
      </ControlButton>
    </motion.div>
  );
}

/** @deprecated Use MapZoomControls inside MapViewport */
export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <MapZoomControls
      variant="desktop"
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
      onReset={onReset}
      className="absolute left-8 top-8 z-30 flex flex-col"
    />
  );
}
