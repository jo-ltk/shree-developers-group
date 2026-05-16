"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-black md:h-screen">
      {/* Desktop / Tablet Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/dduy8wigb/video/upload/v1778742536/hero_videos/hero_bg.jpg"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://res.cloudinary.com/dduy8wigb/video/upload/v1778742536/hero_videos/hero_bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Mobile Layout */}
      <div className="md:hidden relative w-full aspect-[4/5] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://res.cloudinary.com/dduy8wigb/video/upload/v1778742536/hero_videos/hero_bg.jpg"
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dduy8wigb/video/upload/v1778938424/hero_videos/hero_mobile_1778938404986.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Subtle Video Overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Desktop Overlay */}
      <div className="hidden md:block absolute inset-0 z-10 bg-black/20" />

      {/* Hero Content (Desktop) */}
      <div className="relative z-20 hidden md:flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Content removed per user request: "dont write anything on the top of the video" */}
      </div>
    </section>
  );
}