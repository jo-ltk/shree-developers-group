# Shree Developers Group — Design System

> Inspired by Common Form Studio. Every page, every section, every component must feel like it came from the same hand.
> **Rule #1**: Never build a section from scratch. Always compose from the tokens and components defined here.

---

## 1. Design Philosophy

**Core Aesthetic**: Editorial Architecture. Warm, tactile, and precise — like drafting paper, limestone, and handwritten notes. Not cold or corporate. Not trendy. Timeless.

**The Four Pillars**:

1. **Restraint** — Every element earns its place. If it doesn't serve, remove it.
2. **Craft** — Details matter. Blueprint annotations, `fig. 08` markers, numbered sections. These micro-details signal serious quality.
3. **Tension** — Large meets small. Massive serif headlines beside tiny uppercase labels. Dark image panels beside warm cream text areas.
4. **Texture** — The palette feels touchable. Think limestone, aged paper, terracotta clay, concrete.

**What this is NOT**:

- Not a startup SaaS site
- Not purple gradients or glassmorphism
- Not rounded cards and bouncy animations
- Not generic "modern" — this is _editorial_

---

## 2. Color Tokens

Use these **exact values everywhere**. Never introduce a new color without updating this file.

```ts
// design-tokens.ts
export const colors = {
  // Backgrounds
  cream: "#F5F0E8", // Primary bg — aged paper, warm linen
  creamDeep: "#EDE8DF", // Subtle section alternation
  dark: "#1C1208", // Primary dark bg — rich charcoal-brown
  darkMid: "#2A2118", // Cards on dark sections

  // Text
  inkPrimary: "#1C1208", // Primary text on cream
  inkMuted: "#1C1208CC", // 80% opacity — secondary text
  inkFaint: "#1C120866", // 40% opacity — captions, metadata
  creamText: "#F5F0E8", // Text on dark sections
  creamMuted: "#F5F0E8AA", // 66% on dark — secondary

  // Accent (use sparingly — punctuation, not decoration)
  rust: "#D43F33", // Primary accent — terracotta red
  rustLight: "#C94B3C", // Hover state
  rustDot: "#D43F33", // Decorative dots, section markers

  // Structural
  border: "#1C120820", // 12% — hairline dividers
  borderMid: "#1C120840", // 25% — column separators
  gridLine: "#D43F3330", // 18% rust — blueprint grid lines
};
```

**Usage Rules**:

- Rust (`#D43F33`) is used for: period at end of headlines, section counters (`03 / 08`), CTA buttons, small decorative dots, hover link color, and the `+` crosshair icon. **Never use it for large backgrounds or fills.**
- All section backgrounds alternate between `cream` and `dark` only.
- Never use pure white `#FFFFFF` or pure black `#000000`.

---

## 3. Typography

### Font Stack

```css
/* globals.css — Always load these */
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@400;500;600;700&display=swap");
```

| Role                       | Font               | Weight         | Notes                                              |
| -------------------------- | ------------------ | -------------- | -------------------------------------------------- |
| **Display / Hero**         | Cormorant Garamond | 300 Light      | The signature serif. Large, elegant, architectural |
| **Section Headlines**      | Cormorant Garamond | 300–400        | Italics used sparingly for em words                |
| **Body Text**              | Cormorant Garamond | 400            | Slightly larger than usual — 18–20px               |
| **Labels / Eyebrows**      | Montserrat         | 600 SemiBold   | Uppercase, wide tracking. Technical feel           |
| **Buttons**                | Montserrat         | 700 Bold       | Uppercase, tracked                                 |
| **Metadata / fig markers** | Montserrat         | 400 Mono-style | Tiny, uppercase, tracked — `fig. 08`               |

### Type Scale

```ts
export const typeScale = {
  // Hero — massive, commanding
  hero: "clamp(4rem, 8vw, 9rem)", // leading-[0.95]
  heroMd: "clamp(3rem, 6vw, 7rem)",

  // Section headlines
  h2: "clamp(3rem, 5vw, 5.5rem)", // leading-[1.0]
  h3: "clamp(2rem, 3.5vw, 3.5rem)", // leading-[1.05]

  // Card / Sub-section
  h4: "clamp(1.5rem, 2.5vw, 2.2rem)",

  // Body
  bodyLg: "clamp(1.1rem, 1.5vw, 1.3rem)", // leading-[1.7]
  body: "clamp(1rem, 1.2vw, 1.15rem)", // leading-[1.65]

  // Labels
  label: "0.65rem", // uppercase, tracking-[0.25em]
  labelLg: "0.75rem", // uppercase, tracking-[0.2em]

  // Annotation
  annotation: "0.6rem", // fig. 08 style
};
```

### Typography Rules

- Headlines almost always end with a **rust-colored period** `.` — this is the brand signature
- **Never use italic for decoration** — only use italic to emphasize a specific word inside a headline (`finds`, `always`, `together`)
- Labels are **always uppercase** with `tracking-[0.2em]` minimum
- Large headlines use `leading-[0.95]` — tightly compressed, not airy

---

## 4. Spacing & Grid

### Container

```ts
export const layout = {
  maxWidth: "1450px",
  paddingX: "px-8 md:px-12 lg:px-20", // Consistent horizontal breathing room
  paddingY: "py-20 md:py-28 lg:py-36", // Generous vertical rhythm
  gap: "gap-8 md:gap-12 lg:gap-16",
};
```

### The 12-Column Grid

All sections live inside a 12-column CSS grid:

```tsx
<div className="grid grid-cols-12 gap-4 md:gap-6">
```

**Asymmetric Column Patterns** (the key to the editorial feel):

| Pattern        | Left                     | Right        | Use Case                     |
| -------------- | ------------------------ | ------------ | ---------------------------- |
| **7/5 Split**  | `col-span-7`             | `col-span-5` | Hero, feature left-heavy     |
| **5/7 Split**  | `col-span-5`             | `col-span-7` | Feature right-heavy          |
| **4/8 Split**  | `col-span-4`             | `col-span-8` | Text + large image           |
| **3/9 Split**  | `col-span-3`             | `col-span-9` | Sidebar label + content      |
| **Full bleed** | `col-span-12`            | —            | Image panels, dark sections  |
| **Offset**     | `col-start-2 col-span-6` | —            | Pull-quote, centered content |

**Rule**: Never use a perfect 50/50 (`col-span-6 / col-span-6`) split. Always offset.

### Vertical Rhythm Rules

- Between eyebrow and headline: `mb-4 md:mb-6`
- Between headline and body: `mt-4 md:mt-6`
- Between body and CTA: `mt-8 md:mt-12`
- Between sections: `py-24 md:py-36`
- Between cards in a grid: `gap-px` (hairline, like mosaic tiles) or `gap-4`

---

## 5. The Shared Component Library

> **MANDATE**: Every page must use ONLY these components. Do not write inline styles or one-off Tailwind for typography, buttons, or layout. Compose from these.

---

### `<SectionLabel />` — Eyebrow / Counter

The small uppercase label that appears before every headline. Often paired with a section counter like `03 / 08`.

```tsx
// components/ui/SectionLabel.tsx
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  counter?: string; // e.g. "03 / 08"
  className?: string;
  light?: boolean; // true = cream text on dark sections
}

export function SectionLabel({
  children,
  counter,
  className,
  light,
}: SectionLabelProps) {
  const color = light ? "text-[#F5F0E8]/60" : "text-[#D43F33]";
  const textColor = light ? "text-[#F5F0E8]/50" : "text-[#1C120880]";

  return (
    <div className={cn("flex items-start gap-4 mb-6 md:mb-8", className)}>
      {counter && (
        <span
          className={cn("font-semibold tabular-nums shrink-0", color)}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
          }}
        >
          {counter}
        </span>
      )}
      <span
        className={cn("font-semibold uppercase block", textColor)}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
        }}
      >
        {children}
      </span>
    </div>
  );
}
```

**Usage**:

```tsx
<SectionLabel counter="03 / 08">Our Projects</SectionLabel>
<SectionLabel light>Services Offered</SectionLabel>
```

---

### `<SectionHeadline />` — The Signature Heading

Every section headline. Has the rust period at the end. Supports italic emphasis.

```tsx
// components/ui/SectionHeadline.tsx
import { cn } from "@/lib/utils";

interface SectionHeadlineProps {
  children: React.ReactNode;
  size?: "hero" | "xl" | "lg" | "md";
  light?: boolean;
  className?: string;
  noPeriod?: boolean;
}

export function SectionHeadline({
  children,
  size = "lg",
  light,
  className,
  noPeriod,
}: SectionHeadlineProps) {
  const sizes = {
    hero: "text-[clamp(4rem,8vw,9rem)] leading-[0.92]",
    xl: "text-[clamp(3rem,5.5vw,6rem)] leading-[0.95]",
    lg: "text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.0]",
    md: "text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.05]",
  };
  const color = light ? "text-[#F5F0E8]" : "text-[#1C1208]";

  return (
    <h2
      className={cn(
        "tracking-[-0.02em] font-light",
        sizes[size],
        color,
        className,
      )}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 300,
      }}
    >
      {children}
      {!noPeriod && <span className="text-[#D43F33]">.</span>}
    </h2>
  );
}
```

**Usage**:

```tsx
<SectionHeadline size="xl">What the work changes</SectionHeadline>;

{
  /* With italic emphasis — wrap words in <em> */
}
<SectionHeadline size="hero">
  Where trust <em style={{ fontStyle: "italic" }}>finds</em> always home
</SectionHeadline>;

{
  /* The "Builder Notes" / "Numbers that speak plainly" style — compressed & authoritative */
}
<SectionHeadline
  size="xl"
  className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]"
>
  Numbers that
  <br />
  speak plainly
</SectionHeadline>;
```

---

### `<BodyText />` — Paragraph Text

```tsx
// components/ui/BodyText.tsx
import { cn } from "@/lib/utils";

interface BodyTextProps {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
  light?: boolean;
  className?: string;
}

export function BodyText({
  children,
  size = "md",
  light,
  className,
}: BodyTextProps) {
  const sizes = {
    lg: "text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.75]",
    md: "text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.65]",
    sm: "text-[clamp(0.85rem,1vw,0.95rem)] leading-[1.6]",
  };
  const color = light ? "text-[#F5F0E8]/65" : "text-[#1C1208]/55";

  return (
    <p
      className={cn(sizes[size], color, className)}
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {children}
    </p>
  );
}
```

---

### `<Annotation />` — Blueprint Metadata

The small `fig. 08`, `TOOLS FOR MACHINE IMAGINATION`, or `BROOKLYN, NEW YORK` style labels.

```tsx
// components/ui/Annotation.tsx
import { cn } from "@/lib/utils";

export function Annotation({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  const color = light ? "text-[#F5F0E8]/30" : "text-[#1C1208]/30";
  return (
    <span
      className={cn("uppercase tracking-[0.3em] block", color, className)}
      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem" }}
    >
      {children}
    </span>
  );
}
```

**Usage**:

```tsx
<Annotation>fig. 08</Annotation>
<Annotation light>Total Value Secured</Annotation>
```

---

### `<Ornament />` — Decorative Divider

The diamond + hairline divider used between headline and stats.

```tsx
// components/ui/Ornament.tsx
import { cn } from "@/lib/utils";

export function Ornament({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  const lineColor = light ? "bg-[#F5F0E8]/15" : "bg-[#1C1208]/12";
  return (
    <div className={cn("flex items-center gap-3 my-6", className)}>
      <div className={cn("flex-1 h-px", lineColor)} />
      <div
        className="w-[5px] h-[5px] bg-[#D43F33] flex-shrink-0"
        style={{ transform: "rotate(45deg)" }}
      />
      <div className={cn("flex-1 h-px", lineColor)} />
    </div>
  );
}
```

---

### `<RustLine />` — Accent Hairline

A short horizontal rust-colored line used before labels or as a section opener.

```tsx
// components/ui/RustLine.tsx
export function RustLine({ className }: { className?: string }) {
  return <div className={`h-px w-8 bg-[#D43F33] mb-4 ${className ?? ""}`} />;
}
```

---

### `<CrosshairIcon />` — The `+` Blueprint Detail

```tsx
// components/ui/CrosshairIcon.tsx
export function CrosshairIcon({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  const color = light ? "#F5F0E899" : "#D43F3399";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className}>
      <line x1="8" y1="0" x2="8" y2="16" stroke={color} strokeWidth="1" />
      <line x1="0" y1="8" x2="16" y2="8" stroke={color} strokeWidth="1" />
    </svg>
  );
}
```

---

### `<StatItem />` — Metric Display

The `24+ / Projects Delivered` stat block with vertical separator.

```tsx
// components/ui/StatItem.tsx
import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  separator?: boolean; // show left border separator
  light?: boolean;
}

export function StatItem({ value, label, separator, light }: StatItemProps) {
  const numColor = light ? "text-[#F5F0E8]" : "text-[#1C1208]";
  const labelColor = light ? "text-[#F5F0E8]/45" : "text-[#1C1208]/45";
  const sepColor = light ? "bg-[#F5F0E8]/15" : "bg-[#1C1208]/12";

  return (
    <div className="flex items-stretch gap-6 md:gap-10">
      {separator && (
        <div className={cn("w-px self-stretch flex-shrink-0", sepColor)} />
      )}
      <div>
        <div
          className={cn("leading-none", numColor)}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 300,
          }}
        >
          {value}
        </div>
        <div
          className={cn(
            "uppercase tracking-[0.15em] mt-1 font-semibold",
            labelColor,
          )}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
```

**Usage**:

```tsx
<div className="flex items-stretch gap-6">
  <StatItem value="24+" label="Projects Delivered" />
  <StatItem value="2.4k" label="Families Housed" separator />
  <StatItem value="98%" label="Satisfaction Rate" separator />
</div>
```

---

### `<ButtonPrimary />` — Red CTA Button

```tsx
// components/ui/ButtonPrimary.tsx
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonPrimaryProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ButtonPrimary({
  href,
  children,
  className,
}: ButtonPrimaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-[52px] items-center gap-4 bg-[#D43F33] px-8",
        "text-white no-underline overflow-hidden",
        "transition-shadow duration-300 hover:shadow-[0_12px_40px_#D43F3344]",
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
      <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

      <span className="uppercase font-bold whitespace-nowrap relative z-10">
        {children}
      </span>

      {/* Arrow box */}
      <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
```

---

### `<ButtonGhost />` — Text Link Button

```tsx
// components/ui/ButtonGhost.tsx
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonGhostProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function ButtonGhost({
  href,
  children,
  light,
  className,
}: ButtonGhostProps) {
  const textColor = light ? "text-[#F5F0E8]" : "text-[#1C1208]";
  const lineColor = light ? "bg-[#F5F0E8]" : "bg-[#D43F33]";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 pb-1 no-underline",
        textColor,
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      <span className="uppercase font-bold whitespace-nowrap">{children}</span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      {/* Underline */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full",
          lineColor,
        )}
      />
    </Link>
  );
}
```

**Usage** (always pair these two together):

```tsx
<div className="flex items-center gap-8 mt-10">
  <ButtonPrimary href="/projects">Explore Projects</ButtonPrimary>
  <ButtonGhost href="/contact">Get in touch</ButtonGhost>
</div>
```

---

### `<SectionWrapper />` — Page Section Container

Wraps every section. Handles alternating backgrounds and consistent padding.

```tsx
// components/ui/SectionWrapper.tsx
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean; // dark section
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  dark,
  className,
  id,
  noPadding,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        dark ? "bg-[#1C1208]" : "bg-[#F5F0E8]",
        !noPadding && "py-20 md:py-28 lg:py-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1450px] px-8 md:px-12 lg:px-20">
        {children}
      </div>
    </section>
  );
}
```

---

### `<GridLines />` — Blueprint Vertical Lines

Fixed decorative grid lines across viewport. Include once in layout.

```tsx
// components/ui/GridLines.tsx
export function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden lg:flex justify-between px-20 max-w-[1450px] mx-auto left-0 right-0">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-px h-full bg-[#D43F33]/8" />
      ))}
    </div>
  );
}
```

---

### `<FigMarker />` — Bottom-right blueprint annotation

```tsx
// components/ui/FigMarker.tsx
export function FigMarker({ fig, label }: { fig: string; label?: string }) {
  return (
    <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 opacity-20">
      <div
        className="text-[#1C1208]"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
        }}
      >
        {fig}
      </div>
      {label && (
        <>
          <div className="h-px w-8 bg-[#1C1208]/40" />
          <div
            className="text-[#1C1208] uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
            }}
          >
            {label}
          </div>
        </>
      )}
    </div>
  );
}
```

---

### `<ImagePanel />` — Editorial Image Block

All images use this component. Handles the dark green overlay panel and monochrome texture.

```tsx
// components/ui/ImagePanel.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePanelProps {
  src: string;
  alt: string;
  aspectRatio?: string; // default 'aspect-[4/5]'
  overlay?: boolean; // dark green bg-[#1A2C1E] panel behind
  className?: string;
  counter?: string; // '01', '02' etc
  label?: string; // 'MODELING TASTE'
}

export function ImagePanel({
  src,
  alt,
  aspectRatio = "aspect-[4/5]",
  overlay,
  className,
  counter,
  label,
}: ImagePanelProps) {
  return (
    <div className={cn("relative group overflow-hidden", className)}>
      {/* Optional dark panel offset */}
      {overlay && (
        <div className="absolute -inset-2 bg-[#1A2C1E] -z-10 translate-x-3 translate-y-3" />
      )}

      {/* Counter + label */}
      {(counter || label) && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
          {counter && (
            <span
              className="text-[#F5F0E8]/70 font-semibold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
              }}
            >
              {counter}
            </span>
          )}
          {label && (
            <span
              className="text-[#F5F0E8]/70 uppercase"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
```

---

## 6. Section Patterns (Ready-to-Use Compositions)

These are the exact layout patterns to use. Mix and match — don't invent new ones.

### Pattern A — Headline Left / Image Right (7/5)

```tsx
<SectionWrapper>
  <div className="grid grid-cols-12 gap-6 items-end">
    <div className="col-span-12 lg:col-span-7">
      <SectionLabel counter="02 / 06">Our Projects</SectionLabel>
      <SectionHeadline size="xl">
        Built to last
        <br />
        generations
      </SectionHeadline>
      <BodyText className="mt-6 max-w-md">
        We design communities composed for daily comfort — spaces where families
        grow and memories settle.
      </BodyText>
      <div className="flex items-center gap-8 mt-10">
        <ButtonPrimary href="/projects">See Our Work</ButtonPrimary>
        <ButtonGhost href="/contact">Talk to us</ButtonGhost>
      </div>
    </div>
    <div className="col-span-12 lg:col-span-5">
      <ImagePanel
        src="/images/project-1.jpg"
        alt="Project"
        aspectRatio="aspect-[3/4]"
        overlay
      />
    </div>
  </div>
</SectionWrapper>
```

### Pattern B — Dark Section with Stats

```tsx
<SectionWrapper dark>
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-5">
      <SectionLabel light counter="04 / 06">
        By the Numbers
      </SectionLabel>
      <SectionHeadline size="lg" light>
        Numbers that
        <br />
        speak plainly
      </SectionHeadline>
    </div>
    <div className="col-span-12 lg:col-span-7 flex items-end">
      <div className="flex flex-wrap gap-8 md:gap-16">
        <StatItem value="24+" label="Projects Delivered" light />
        <StatItem value="2.4k" label="Families Housed" separator light />
        <StatItem value="98%" label="Satisfaction Rate" separator light />
      </div>
    </div>
  </div>
  <FigMarker fig="fig. 04" label="Growth Data" />
</SectionWrapper>
```

### Pattern C — Mosaic Grid (like Research Areas page)

```tsx
<SectionWrapper>
  <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10">
    {/* Large image top center */}
    <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8]">
      <ImagePanel
        src="/images/project-a.jpg"
        alt="A"
        aspectRatio="aspect-[16/9]"
        counter="01"
        label="SHREE RESIDENCES"
      />
    </div>
    {/* Text card top right */}
    <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-10 flex flex-col justify-end">
      <SectionHeadline size="md">Premium Residences</SectionHeadline>
      <BodyText className="mt-4">
        Thoughtfully designed homes for modern families.
      </BodyText>
    </div>
    {/* Bottom row */}
    <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8]">
      <ImagePanel
        src="/images/project-b.jpg"
        alt="B"
        aspectRatio="aspect-[1/1]"
        counter="02"
      />
    </div>
    <div className="col-span-12 lg:col-span-4 bg-[#1C1208] p-10 flex flex-col justify-center">
      <SectionHeadline size="md" light>
        Township Projects
      </SectionHeadline>
      <BodyText light className="mt-4">
        Integrated communities with every amenity.
      </BodyText>
      <ButtonGhost href="/townships" light className="mt-6">
        Explore
      </ButtonGhost>
    </div>
    <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8]">
      <ImagePanel
        src="/images/project-c.jpg"
        alt="C"
        aspectRatio="aspect-[1/1]"
        counter="03"
      />
    </div>
  </div>
</SectionWrapper>
```

### Pattern D — Process Steps (Vertical Timeline)

```tsx
<SectionWrapper>
  <SectionLabel counter="05 / 06">Our Process</SectionLabel>
  <SectionHeadline size="xl" className="mb-16">
    How we
    <br />
    build
  </SectionHeadline>

  <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10">
    {[
      {
        num: "01",
        title: "Site Selection",
        body: "We identify land with long-term value — location, soil, surroundings.",
      },
      {
        num: "02",
        title: "Design",
        body: "Architecture with intention. Every unit planned for light, air, and livability.",
      },
      {
        num: "03",
        title: "Construction",
        body: "Built to specification. No shortcuts. No compromises on structure.",
      },
      {
        num: "04",
        title: "Handover",
        body: "We hand over complete homes — not promises.",
      },
    ].map((step) => (
      <div
        key={step.num}
        className="col-span-12 lg:col-span-3 bg-[#F5F0E8] p-10 group"
      >
        <div className="flex items-start justify-between mb-8">
          <Annotation>{step.num}</Annotation>
          <CrosshairIcon />
        </div>
        <SectionHeadline size="md" noPeriod>
          {step.title}
          <span className="text-[#D43F33]">.</span>
        </SectionHeadline>
        <BodyText className="mt-4" size="sm">
          {step.body}
        </BodyText>
        <ButtonGhost href="#" className="mt-8">
          Learn more
        </ButtonGhost>
      </div>
    ))}
  </div>
</SectionWrapper>
```

### Pattern E — Testimonial / Quote Section

```tsx
<SectionWrapper dark>
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-4">
      <SectionLabel light counter="06 / 06">
        Residents Say
      </SectionLabel>
    </div>
    <div className="col-span-12 lg:col-span-8">
      <div className="border-l-2 border-[#D43F33] pl-8 md:pl-12">
        <p
          className="text-[#F5F0E8] leading-[1.4] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          "Shree didn't just build us a house. They built us a home we never
          want to leave."
        </p>
        <div className="flex items-center gap-4">
          <RustLine className="mb-0" />
          <div>
            <Annotation light className="text-[#F5F0E8]/80">
              RAJESH KUMAR
            </Annotation>
            <Annotation light>Resident, Shree Harmony · Flat 4B</Annotation>
          </div>
        </div>
      </div>
    </div>
  </div>
</SectionWrapper>
```

---

## 7. Animation Standards

All animations in `globals.css` or inline `useLayoutEffect`. Never use third-party animation libraries unless already installed (GSAP is fine if in the project).

```css
/* globals.css */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scrollPulse {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.5);
    opacity: 0.4;
  }
}
```

**Stagger Pattern** (how to cascade elements):

```css
.anim-el-1 {
  opacity: 0;
  animation: fadeUp 0.8s ease 0.2s forwards;
}
.anim-el-2 {
  opacity: 0;
  animation: fadeUp 0.8s ease 0.4s forwards;
}
.anim-el-3 {
  opacity: 0;
  animation: fadeUp 0.8s ease 0.6s forwards;
}
.anim-el-4 {
  opacity: 0;
  animation: fadeUp 0.8s ease 0.8s forwards;
}
```

**Timing Rules**:
| Interaction | Duration | Easing |
|---|---|---|
| Button hover | 300ms | ease |
| Button shadow | 300ms | ease |
| Ghost underline | 500ms | ease |
| Image scale | 2000ms | ease-out |
| Page load stagger | 200ms increments | ease |
| Arrow translate | 300ms | ease |

---

## 8. Anti-Patterns — What to NEVER Do

| ❌ Wrong                                | ✅ Right                                                              |
| --------------------------------------- | --------------------------------------------------------------------- |
| Rounded corners anywhere                | 0px border radius — always rectangular                                |
| Pure black `#000000`                    | Use `#1C1208`                                                         |
| Pure white `#FFFFFF`                    | Use `#F5F0E8`                                                         |
| 50/50 column splits                     | Always asymmetric: 7/5, 4/8, 3/9                                      |
| Fast animations (< 300ms)               | Min 300ms; images 2000ms                                              |
| Inter / Roboto / system fonts           | Cormorant Garamond + Montserrat only                                  |
| Bright colors beyond rust               | Only `#D43F33` as accent                                              |
| Rust on large areas                     | Rust is punctuation — tiny, precise                                   |
| Shadow `drop-shadow(2px 2px 4px black)` | Soft: `shadow-[0_12px_40px_#D43F3344]`                                |
| Writing body text in Montserrat         | Montserrat = labels, buttons only                                     |
| Centered layouts                        | Left-aligned, bottom-aligned. Offset grids                            |
| Stock-photo style images                | Architectural, tactile, sculptural photography                        |
| Headline without rust period            | Always end headlines with `<span className="text-[#D43F33]">.</span>` |
| One-off colors or fonts                 | Only tokens from Section 2 and Section 3                              |

---

## 9. File & Component Structure

```
components/
  ui/
    SectionLabel.tsx
    SectionHeadline.tsx
    BodyText.tsx
    Annotation.tsx
    Ornament.tsx
    RustLine.tsx
    CrosshairIcon.tsx
    StatItem.tsx
    ButtonPrimary.tsx
    ButtonGhost.tsx
    SectionWrapper.tsx
    GridLines.tsx
    FigMarker.tsx
    ImagePanel.tsx
  sections/
    Hero.tsx          ← already built
    Projects.tsx
    Process.tsx
    Stats.tsx
    Testimonials.tsx
    Contact.tsx
  layout/
    Navbar.tsx
    Footer.tsx
```

**Rule**: If you are building a new page, you must use `SectionWrapper` as the shell and compose with `SectionLabel`, `SectionHeadline`, `BodyText`, `ButtonPrimary`, `ButtonGhost`. No exceptions.

---

## 10. Quick Reference Card

```
Background (cream)   #F5F0E8
Background (dark)    #1C1208
Accent (rust)        #D43F33
Primary text         #1C1208
Secondary text       #1C1208 @ 55% opacity
Headline font        Cormorant Garamond, weight 300
Label/button font    Montserrat, weight 600-700
Label tracking       0.25em minimum
Image hover scale    1.04, 2000ms ease-out
Button height        52px
Max width            1450px
Section padding Y    py-20 md:py-28 lg:py-36
Section padding X    px-8 md:px-12 lg:px-20
Border radius        0px — always
```
