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
    } else if (diff > 20) {
      setIsHidden(true);
    } else if (diff < -20) {
      setIsHidden(false);
    }

    setIsAtTop(latest < 50);
  });

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          isAtTop
            ? "bg-transparent py-6 lg:py-8"
            : "bg-white/80 pb-4 pt-3 shadow-lg backdrop-blur-xl border-b border-dark/5"
        }`}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-110%", opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-24">
          <div className="flex items-center justify-between">
            {/* Left: Interactive Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`group flex items-center gap-4 transition-colors duration-500 ${
                isAtTop ? "text-white" : "text-dark"
              }`}
            >
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-active:scale-95">
                <Menu className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <Annotation className={`responsive-stat-label !font-bold ${isAtTop ? "text-white" : "text-dark"} opacity-80 group-hover:opacity-100`}>
                  Menu
                </Annotation>
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
                  isAtTop ? "h-20 w-[14rem]" : "h-14 w-[11rem]"
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
              <Annotation className="responsive-stat-label !font-bold !text-[#1C1208]/40">Navigation</Annotation>
              <button
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-3 text-dark transition-opacity hover:opacity-70"
              >
                <Annotation className="responsive-stat-label !font-bold !text-dark">Close</Annotation>
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
                      className="block font-light leading-none tracking-tight transition-transform duration-500 group-hover:-translate-y-2 responsive-headline-xl"
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
                  <Annotation className="mb-4 responsive-stat-label !font-bold !text-dark/40">Inquiries</Annotation>
                  <a href="mailto:info@shreedevelopers.com" className="text-base font-light lg:text-lg hover:text-rust transition-colors">info@shreedevelopers.com</a>
                </div>
                <div className="lg:text-center">
                  <Annotation className="mb-4 responsive-stat-label !font-bold !text-dark/40">Follow Us</Annotation>
                  <div className="flex gap-6 lg:justify-center">
                    <a href="#" className="hover:text-rust transition-colors"><Instagram className="h-5 w-5" /></a>
                    <a href="#" className="hover:text-rust transition-colors"><Facebook className="h-5 w-5" /></a>
                    <a href="#" className="hover:text-rust transition-colors"><Linkedin className="h-5 w-5" /></a>
                  </div>
                </div>
                <div className="lg:text-right">
                  <Annotation className="mb-4 responsive-stat-label !font-bold !text-dark/40">Shree Experience</Annotation>
                  <BodyText className="ml-auto max-w-[280px] font-light leading-relaxed opacity-60 italic responsive-body-sm">
                    Architecting legacies of trust across the horizon since 1998.
                  </BodyText>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}