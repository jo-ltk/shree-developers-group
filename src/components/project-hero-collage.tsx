"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HeroAccentImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function ProjectHeroCollage({
  mainSrc,
  mainAlt,
  accents,
  priority = true,
}: {
  mainSrc: string;
  mainAlt: string;
  accents: HeroAccentImage[];
  priority?: boolean;
}) {
  const items = accents.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex === null
      ? { src: mainSrc, alt: mainAlt }
      : items[activeIndex] ?? { src: mainSrc, alt: mainAlt };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="flex h-full min-h-[inherit] w-full flex-col"
    >
      {/* Main display — swaps when a thumbnail is selected */}
      <div className="relative min-h-[200px] flex-1 overflow-hidden sm:min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority={priority && activeIndex === null}
              sizes="(max-width: 1200px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 0 ? (
        <div className="grid shrink-0 grid-cols-3 gap-px border-t border-dark/10 bg-dark/10">
          {items.map((img, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.button
                key={img.src}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                aria-pressed={isActive}
                aria-label={`Show ${img.caption ?? img.alt} in main view`}
                className={`group relative min-w-0 cursor-pointer bg-cream text-left transition-colors ${
                  isActive ? "bg-cream-deep" : "hover:bg-cream-deep/60"
                }`}
              >
                <motion.div
                  layout
                  className={`relative aspect-[2/1] w-full overflow-hidden sm:aspect-[5/3] ${
                    isActive ? "ring-2 ring-inset ring-rust" : ""
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1200px) 33vw, 180px"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      isActive ? "scale-100" : "group-hover:scale-[1.03]"
                    }`}
                  />
                </motion.div>
                {img.caption ? (
                  <motion.p
                    layout
                    className={`hidden min-w-0 border-t px-2 py-2 text-center text-[8px] font-bold uppercase tracking-[0.22em] whitespace-nowrap md:block ${
                      isActive ? "border-rust/25 text-rust" : "border-dark/8 text-dark/50"
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {img.caption}
                  </motion.p>
                ) : null}
              </motion.button>
            );
          })}
        </div>
      ) : null}
    </motion.div>
  );
}
