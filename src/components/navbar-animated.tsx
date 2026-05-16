"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { Annotation } from "./ui/annotation";
import { BodyText } from "./ui/body-text";

const navLinks = [
  { title: "About", href: "/about" },
  { title: "Projects", href: "/#gallery" },
  { title: "Interactive Map", href: "/InteractiveSiteMap" },
  { title: "Contact", href: "/#footer" },
];

export function NavbarAnimated() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    
    if (mobileOpen) {
      setIsHidden(false);
      return;
    }

    if (latest < 80) {
      setIsHidden(false);
    } else if (diff > 50) {
      setIsHidden(true);
    } else if (diff < -30) {
      setIsHidden(false);
    }

    setIsAtTop(latest < 50);
  });

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          isAtTop
            ? "bg-transparent py-4 md:py-6 lg:py-8"
            : "bg-white/95 py-2.5 md:py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border-b border-dark/5"
        }`}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-110%", opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-20 xl:px-24">
          <div className="flex items-center justify-between">
            {/* Left: Interactive Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`group flex items-center gap-2.5 md:gap-4 transition-colors duration-500 ${
                isAtTop ? "text-white" : "text-dark"
              }`}
            >
              <div className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-active:scale-95">
                <Menu className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 group-hover:rotate-180" />
              </div>
              <div className="hidden xs:flex flex-col items-start leading-none">
                <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100">
                  Menu
                </span>
                <span className={`mt-1.5 h-[1px] w-0 transition-all duration-500 group-hover:w-full ${isAtTop ? 'bg-white' : 'bg-rust'}`} />
              </div>
            </button>

            {/* Right: Premium Logo */}
            <Link 
              href="/" 
              className="relative transition-all duration-700 hover:opacity-80 active:scale-95"
            >
              <BrandMark
                variant={isAtTop ? "steel" : "black"}
                className={`transition-all duration-500 ${
                  isAtTop 
                    ? "h-12 w-[10rem] md:h-20 md:w-[14rem]" 
                    : "h-9 w-[8rem] md:h-14 md:w-[11rem]"
                }`}
                imageClassName="object-right"
                alt="Shree Developers Group logo"
                priority
              />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Immersive Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#F5F0E8] text-[#1C1208]"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 pt-12 sm:px-10 lg:px-16 lg:pt-20 xl:px-20">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-40">Navigation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-3 text-dark transition-opacity hover:opacity-70"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Close</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dark/10">
                  <X className="h-5 w-5" />
                </div>
              </button>
            </div>

            {/* Main Menu Content */}
            <div className="mx-auto flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20 xl:px-20">
              <nav className="flex flex-col gap-4 md:gap-8 lg:gap-10">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group relative w-fit overflow-hidden py-1 lg:py-2"
                  >
                    <motion.span
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="block text-[clamp(2rem,6vw,5rem)] font-light leading-none tracking-tight transition-transform duration-500 group-hover:-translate-y-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {link.title}
                    </motion.span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-rust transition-all duration-500 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Bottom Details */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 grid grid-cols-1 gap-10 border-t border-dark/10 pt-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:pt-12"
              >
                <div>
                  <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Inquiries</h4>
                  <a href="mailto:info@shreedevelopers.com" className="text-base font-light lg:text-lg hover:text-rust transition-colors">info@shreedevelopers.com</a>
                </div>
                <div className="lg:text-center">
                  <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Follow Us</h4>
                  <div className="flex gap-6 lg:justify-center">
                    <a href="#" className="hover:text-rust transition-colors"><Instagram className="h-5 w-5" /></a>
                    <a href="#" className="hover:text-rust transition-colors"><Facebook className="h-5 w-5" /></a>
                    <a href="#" className="hover:text-rust transition-colors"><Linkedin className="h-5 w-5" /></a>
                  </div>
                </div>
                <div className="lg:text-right">
                  <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Shree Experience</h4>
                  <p className="ml-auto max-w-[280px] text-xs font-light leading-relaxed opacity-60 italic lg:text-sm">
                    Architecting legacies of trust across the horizon since 1998.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}