"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MapConfig } from "../data/lots";

interface MapSwitcherProps {
  selectedMapId: string;
  setSelectedMapId: (id: string) => void;
  configs: MapConfig[];
  variant?: "desktop" | "mobile";
}

export function MapSwitcher({
  selectedMapId,
  setSelectedMapId,
  configs,
  variant = "desktop",
}: MapSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedMap = configs.find((m) => m.id === selectedMapId) || configs[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const isDesktop = variant === "desktop";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 border-b border-[#1C1208]/20 py-1 transition-all duration-300 hover:border-[#D43F33] group ${
          isDesktop ? "pr-8 text-[0.65rem]" : "pr-6 text-[0.55rem]"
        } font-bold uppercase tracking-[0.2em] text-[#1C1208] focus:outline-none`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="truncate">{selectedMap.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 flex items-center justify-center"
        >
          <ChevronDown className={`opacity-40 group-hover:opacity-100 transition-opacity ${isDesktop ? 'h-3 w-3' : 'h-2.5 w-2.5'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98, transformOrigin: "top" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute left-0 z-[100] mt-2 min-w-[240px] overflow-hidden border border-[#1C1208]/10 bg-[#F5F0E8] shadow-[0_30px_60px_rgba(28,18,8,0.18)] backdrop-blur-md`}
          >
            <div className="p-1">
              {configs.map((map) => {
                const isActive = selectedMapId === map.id;
                return (
                  <button
                    key={map.id}
                    type="button"
                    onClick={() => {
                      setSelectedMapId(map.id);
                      setIsOpen(false);
                    }}
                    className={`group/item flex w-full items-center justify-between px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#EDE8DF] text-[#D43F33]"
                        : "text-[#1C1208]/60 hover:bg-[#D43F33] hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                        <span 
                            className="text-[0.65rem] font-bold uppercase tracking-[0.2em]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            {map.name}
                        </span>
                        <span className={`text-[0.5rem] mt-1 font-medium tracking-[0.1em] transition-colors ${isActive ? "text-[#D43F33]/60" : "text-[#1C1208]/30 group-hover/item:text-white/60"}`}>
                            {map.lots.length} Homesites
                        </span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="h-1.5 w-1.5 rounded-full bg-[#D43F33]" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
