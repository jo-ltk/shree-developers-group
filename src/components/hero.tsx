"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
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

      {/* Mobile Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/dduy8wigb/video/upload/v1778742536/hero_videos/hero_bg.jpg"
        className="block md:hidden absolute inset-0 w-full h-full object-contain bg-black"
      >
        <source
          src="https://res.cloudinary.com/dduy8wigb/video/upload/v1778742536/hero_videos/hero_bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* Hero Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Content removed per user request: "dont write anything on the top of the video" */}
      </div>
    </section>
  );
}