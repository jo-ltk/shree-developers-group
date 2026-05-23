"use client";

import Image from "next/image";

const MAP_URL = "/images/hanover-park/master-plan.jpg";

export function HanoverParkStage() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F5F0E8]">
      <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
        <Image
          src={MAP_URL}
          alt="Hanover Park at Stockbridge master plan"
          width={2400}
          height={1600}
          className="max-h-full w-auto max-w-full object-contain"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F5F0E8] via-[#F5F0E8]/80 to-transparent px-4 pb-4 pt-12 md:px-8 md:pb-6">
        <p className="max-w-xl text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/45">
          Master plan preview — interactive lot selection coming soon. Browse home types in the panel.
        </p>
      </div>
    </div>
  );
}
