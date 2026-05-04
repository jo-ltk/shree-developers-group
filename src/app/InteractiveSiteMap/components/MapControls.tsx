"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -1, transition: { type: "spring", stiffness: 520, damping: 28 } }
      }
      className="grid size-11 place-items-center border border-[rgba(183,170,152,0.5)] bg-[linear-gradient(160deg,rgba(255,255,255,0.58)_0%,rgba(250,248,243,0.72)_42%,rgba(237,229,217,0.78)_100%)] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_10px_24px_-14px_rgba(28,18,8,0.33)] backdrop-blur-md transition-[border-color,color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_14px_32px_-10px_rgba(201,174,123,0.35)] active:brightness-[0.98]"
    >
      {children}
    </motion.button>
  );
}

export function MapControls() {
  /**
   * react-zoom-pan-pinch 4.x signatures:
   * zoomIn(step?, animationTime?, animationType?)
   * resetTransform(animationTime?, animationType?, animationDisabled?)
   */
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-4 right-4 z-30 flex flex-col items-center gap-2 rounded-[10px] border border-[rgba(183,170,152,0.42)] bg-[linear-gradient(180deg,rgba(250,248,243,0.78)_0%,rgba(245,239,229,0.65)_100%)] p-2 shadow-[0_18px_44px_-20px_rgba(28,18,8,0.42),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md lg:bottom-auto lg:left-4 lg:right-auto lg:top-4 lg:flex-row">
      <ControlButton label="Zoom in" onClick={() => zoomIn(0.26, 420, "easeOutCubic")}>
        <Plus className="size-4" />
      </ControlButton>
      <ControlButton label="Zoom out" onClick={() => zoomOut(0.26, 420, "easeOutCubic")}>
        <Minus className="size-4" />
      </ControlButton>
      <ControlButton label="Reset map" onClick={() => resetTransform(480, "easeOutCubic")}>
        <LocateFixed className="size-4" />
      </ControlButton>
    </div>
  );
}
