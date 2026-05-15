"use client";

import { SectionHeadline } from "./ui/section-headline";
import { ButtonPrimary } from "./ui/button-primary";
import { ButtonGhost } from "./ui/button-ghost";
import { Instagram } from "lucide-react";

export function QuickActions() {
  return (
    <section className="w-full border-b border-dark/5 bg-cream py-10 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1450px] flex-col items-center gap-0 px-6 sm:px-10 md:px-14 lg:px-20 text-center">

        {/* Brand Name */}
        <SectionHeadline
          size="xl"
          className="mb-7"
        >
          Shree Developers Group
        </SectionHeadline>

        {/* Emotional statement */}
        <p
          className="text-[clamp(0.9rem,1.6vw,1.1rem)] text-dark/60 leading-[1.6] mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
         Building Futures, One Community At A Time
        </p>

        {/* Rule */}
        <div className="mb-9 h-px w-full max-w-[420px] bg-rust/[0.16]" />

        {/* CTAs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <ButtonPrimary href="/projects" className="!h-[50px] !px-7">
            Explore Communities
          </ButtonPrimary>
          <ButtonGhost href="/contact?type=visit" className="text-[8.5px] tracking-[0.22em]">
            Book a Visit
          </ButtonGhost>
          <div className="hidden sm:block h-6 w-px bg-dark/10" />
          <ButtonGhost href="/contact?type=pricing" className="text-[8.5px] tracking-[0.22em]">
            Get Pricing
          </ButtonGhost>
        </div>

        {/* Social inquiry */}
        <span
          className="mb-4 text-[7.5px] font-bold uppercase tracking-[0.4em] text-dark/25"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Instant Inquiry
        </span>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="https://wa.me/yournumber"
            className="group flex items-center gap-2.5 text-dark/50 transition-colors hover:text-rust"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 transition-colors group-hover:border-rust/30 group-hover:bg-rust/5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.18em]">WhatsApp</span>
          </a>
          <div className="h-3.5 w-px bg-dark/10" />
          <a
            href="https://instagram.com/yourhandle"
            className="group flex items-center gap-2.5 text-dark/50 transition-colors hover:text-rust"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 transition-colors group-hover:border-rust/30 group-hover:bg-rust/5">
              <Instagram className="h-4 w-4" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.18em]">Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}