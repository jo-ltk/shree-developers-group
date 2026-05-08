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
      className="grid size-8 lg:size-10 place-items-center text-[#1C1208] transition-colors duration-300 hover:bg-[#D43F33] hover:text-white"
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="absolute left-3 top-3 lg:left-8 lg:top-8 z-30 flex lg:flex-col items-center bg-[#F5F0E8]/95 border border-[#1C1208]/10 shadow-lg backdrop-blur-md overflow-hidden rounded-full lg:rounded-sm"
    >
      <ControlButton label="Zoom in" onClick={onZoomIn}>
        <Plus className="size-3.5 lg:size-4" strokeWidth={1.5} />
      </ControlButton>
      <div className="h-4 w-px lg:h-px lg:w-4 bg-[#1C1208]/10" />
      <ControlButton label="Zoom out" onClick={onZoomOut}>
        <Minus className="size-3.5 lg:size-4" strokeWidth={1.5} />
      </ControlButton>
      <div className="h-4 w-px lg:h-px lg:w-4 bg-[#1C1208]/10" />
      <ControlButton label="Reset map" onClick={onReset}>
        <LocateFixed className="size-3.5 lg:size-4" strokeWidth={1.5} />
      </ControlButton>
    </motion.div>
  );
}
