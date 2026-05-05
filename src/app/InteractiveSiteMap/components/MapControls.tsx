"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LocateFixed, Minus, Plus } from "lucide-react";

function ControlButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className="grid size-10 place-items-center text-[#1C1208] transition-colors duration-300 hover:bg-[#D43F33] hover:text-white"
    >
      {children}
    </motion.button>
  );
}

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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="absolute left-6 top-6 z-30 flex flex-col items-center bg-[#F5F0E8]/80 border border-[#1C1208]/10 shadow-[0_8px_32px_rgba(28,18,8,0.12)] backdrop-blur-xl overflow-hidden rounded-sm"
    >
      <ControlButton label="Zoom in" onClick={onZoomIn}>
        <Plus className="size-4" strokeWidth={1.5} />
      </ControlButton>
      <div className="h-[1px] w-4 bg-[#1C1208]/10" />
      <ControlButton label="Zoom out" onClick={onZoomOut}>
        <Minus className="size-4" strokeWidth={1.5} />
      </ControlButton>
      <div className="h-[1px] w-4 bg-[#1C1208]/10" />
      <ControlButton label="Reset map" onClick={onReset}>
        <LocateFixed className="size-4" strokeWidth={1.5} />
      </ControlButton>
    </motion.div>
  );
}
