"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { SectionLabel } from "./ui/section-label";

const NoScrollbarStyle = () => (
  <style jsx global>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const galleryImages = [
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935490/shree-gallery/exfcj6syu54ugowjcjx3.jpg", alt: "Architectural detail 1", title: "Refined Vision" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935497/shree-gallery/xn6bxhuica3zr8sswr2z.jpg", alt: "Architectural detail 2", title: "Modern Living" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935505/shree-gallery/nbtuyztymqhpecabm27n.jpg", alt: "Architectural detail 3", title: "Elegant Spaces" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935513/shree-gallery/pvsbrhjpc5zxnlvmwlyk.jpg", alt: "Architectural detail 4", title: "Serene Sanctuaries" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935520/shree-gallery/dfwwjaugwrztrzm4pmwx.jpg", alt: "Architectural detail 5", title: "Grand Arrivals" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935527/shree-gallery/e5jfwc0uohsqgtdm2qt4.jpg", alt: "Architectural detail 6", title: "Luxe Textures" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935534/shree-gallery/ymg8w2pvns7jud8ly7b0.jpg", alt: "Architectural detail 7", title: "Bespoke Design" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935540/shree-gallery/r83kmoarupaaqtncptv6.jpg", alt: "Architectural detail 8", title: "Urban Oasis" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935547/shree-gallery/hy8jynxcd3zurxakekq6.jpg", alt: "Architectural detail 9", title: "Timeless Style" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935553/shree-gallery/wdx2nlherhyteeiuz49d.jpg", alt: "Architectural detail 10", title: "Sophisticated Comfort" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935559/shree-gallery/a1bqriv7n2hmae3fikq6.jpg", alt: "Architectural detail 11", title: "Pure Aesthetics" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935567/shree-gallery/sprmoli2b673pruzac7u.jpg", alt: "Architectural detail 12", title: "Living Art" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935574/shree-gallery/hwyi16be7ytkc7ghd2bc.jpg", alt: "Architectural detail 13", title: "Exquisite Detail" },
  { url: "https://res.cloudinary.com/dduy8wigb/image/upload/v1778935582/shree-gallery/mbjyw2a0ihdthavkqonm.jpg", alt: "Architectural detail 14", title: "Final Vision" },
];

export function ImageGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  const openLightbox = (idx: number) => {
    // We use the index of the original galleryImages, not the repeated one
    setSelectedIdx(idx % galleryImages.length);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  // Repeated images to create a seamless marquee
  const repeatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <SectionWrapper id="experience-gallery" dark={false} className="!pt-0 !pb-8 md:!pb-12 overflow-hidden">
      <NoScrollbarStyle />
      
      <div className="flex flex-col items-center mb-8 md:mb-8">
        <div className="flex flex-col responsive-minimum-gap items-center">
          <SectionLabel className="justify-center !mb-0">Visual Journey</SectionLabel>
          <SectionHeadline size="xl" noPeriod className="responsive-headline-xl max-w-4xl text-center m-0">
            A tapestry of refined living experiences
          </SectionHeadline>
          <div className="w-full h-[1px] bg-[#1C1208]/10 relative mt-4 overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 bg-rust w-1/3"
              animate={{ 
                x: ["-100%", "300%"] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </div>
      </div>

      {/* Marquee Slider */}
      <div className="relative w-screen max-w-none ml-[calc(-50vw+50%)] overflow-hidden group">
        <div 
          className="flex min-w-max items-center gap-4 md:gap-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ 
            animation: "marquee 60s linear infinite",
          }}
        >
          {repeatedImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative flex-shrink-0 overflow-hidden bg-[#E8E3DB] cursor-pointer w-[280px] h-[70vh] md:w-[450px] md:h-[85vh]"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">Visual</span>
                <span className="text-white text-lg font-serif italic">{image.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CSS for marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            will-change: transform;
          }
        `}</style>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1C1208]/95 backdrop-blur-md p-4 md:p-12"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            onClick={prevImage}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            onClick={nextImage}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[selectedIdx].url}
                alt={galleryImages[selectedIdx].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Caption */}
            <div className="mt-8 text-center">
              <div className="text-rust uppercase text-[10px] tracking-[0.3em] mb-2 font-medium">Selected Frame</div>
              <h3 className="text-white text-3xl md:text-5xl font-serif italic tracking-tight">
                {galleryImages[selectedIdx].title}
              </h3>
            </div>
          </motion.div>

          {/* Index Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[11px] tracking-widest uppercase">
            {selectedIdx + 1} <span className="mx-2 text-white/10">/</span> {galleryImages.length}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
