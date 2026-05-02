# Shree Developers Group Design System & Patterns

This document defines the core colors, typography, spacing, and component patterns for the Shree Developers Group website. The visual direction draws inspiration from Nevra's editorial warmth — cream backgrounds, deep dark sections, and rich burgundy accent typography.

## 1. Brand Philosophy

This website blends **Nevra's editorial warmth and typographic sophistication** with **Shree's identity as a premium architectural builder**. Pages should feel like spreads in a luxury property brochure — warm, spacious, and deeply trustworthy. Not a tech product. Not a portal.

## 2. Color Palette

| Token               | Hex       | Usage                                                                 |
| :------------------ | :-------- | :-------------------------------------------------------------------- |
| **Warm Cream**      | `#FAF8F3` | Primary page background                                               |
| **Soft Beige**      | `#F2EADF` | Alternating sections, card backgrounds                                |
| **Premium Sand**    | `#E8DFD2` | Borders, dividers, hover backgrounds                                  |
| **Burgundy Accent** | `#8B2A2A` | Italic heading accents, eyebrow labels, active states — use sparingly |
| **Warm Stone**      | `#B7AA98` | Secondary text, form borders, captions                                |
| **Deep Warm Dark**  | `#1C1208` | Dark section backgrounds, primary headings                            |
| **Cream on Dark**   | `#FAF8F3` | Text used on dark `#1C1208` backgrounds                               |

**Rules:**

- Light sections: `#FAF8F3` / `#F2EADF` background, `#1C1208` text
- Dark sections: `#1C1208` background, `#FAF8F3` text
- Burgundy `#8B2A2A` is reserved for italic accent words in headlines and eyebrow labels only — never flood the screen with it

## 3. Typography Scale

Always use the `Inter` font family for body and UI. For italic headline accents, a serif (e.g. `Playfair Display`) may be used selectively within large headings.

| Element                  | Mobile Class | Desktop Class | Additional Classes                                                                 |
| :----------------------- | :----------- | :------------ | :--------------------------------------------------------------------------------- |
| **Eyebrow / Label**      | `text-xs`    | `text-sm`     | `font-semibold`, `uppercase`, `tracking-widest`, `text-[#8B2A2A]`, `mb-4`, `block` |
| **Section Heading (h2)** | `text-2xl`   | `text-4xl`    | `leading-[1.1]`, `font-medium`, `tracking-tight`                                   |
| **Body (Large)**         | `text-lg`    | `text-xl`     | `leading-relaxed`, `font-medium`                                                   |
| **Body (Standard)**      | `text-base`  | `text-lg`     | `leading-relaxed`, `text-[#1C1208]`                                                |
| **Card Title (h3)**      | `text-xl`    | `text-2xl`    | `leading-[1.1]`, `font-medium`, `tracking-tight`                                   |
| **Stat Value**           | `text-2xl`   | `text-4xl`    | `leading-[1.1]`, `font-medium`, `tracking-tight`                                   |

**Italic accent words:** Selectively italicize one or two words in large headings using burgundy — same pattern as Nevra's _"Perfected by humans"_ treatment.

```tsx
<h1>
  Build something{" "}
  <em className="text-[#8B2A2A] font-serif italic">extraordinary</em>
</h1>
```

## 4. Spacing Scale

### Section Layout

- **Light Section Padding**: `py-20 md:py-32`
- **Dark / Feature Section Padding**: `py-24 md:py-48`
- **Horizontal Container Padding**: `px-5 md:px-10 lg:px-20`
- **Max Container Width**: `max-w-7xl` (centered with `mx-auto`)

### Gaps & Margins

- **Header Block Bottom Margin**: `mb-10 md:mb-16`
- **Large Content Gap**: `gap-8 lg:gap-16`
- **Card Padding**: `p-6 md:p-10`

Prefer asymmetrical layouts (e.g. 40/60 image-text splits) over generic 50/50 grids.

## 5. Component Patterns

### Buttons & CTAs

**Do not redesign the existing Shree button styles.** Preserve all border-radius, hover logic, and interaction styles. Only remap colors if they deviate from Section 2:

- **Primary button**: `#1C1208` background, `#FAF8F3` text
- **Secondary / ghost button**: `#FAF8F3` or `transparent` background, `#1C1208` border and text

### Eyebrow Pill Badge

Inspired by Nevra's `+ How we work` pill label style.

```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E8DFD2] text-[#8B2A2A] text-xs font-semibold uppercase tracking-widest mb-6">
  <span>+</span> Our Projects
</span>
```

### Animated Eyebrow (Section Label)

```tsx
<motion.span
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="text-[#8B2A2A] font-semibold uppercase tracking-widest text-sm mb-4 block"
>
  Label Text
</motion.span>
```

### Dark Sections

Use `#1C1208` as a background for hero alternates, CTA banners, and feature callout sections. Text goes to `#FAF8F3`.

```tsx
<section className="bg-[#1C1208] text-[#FAF8F3] py-24 md:py-48">
  <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">...</div>
</section>
```

### Cards

Use soft background contrast — a `#FAF8F3` card on a `#F2EADF` section. On dark sections, cards use a slightly lighter dark: `bg-[#2A1E10]`. Borders: `1px solid #E8DFD2` on light, `1px solid #3A2A18` on dark. Avoid heavy drop shadows.

### Inquiry Forms

Inputs use `#F2EADF` backgrounds with `#B7AA98` borders. On focus, border transitions to `#8B2A2A`.

```tsx
<input className="bg-[#F2EADF] border border-[#B7AA98] focus:border-[#8B2A2A] rounded px-4 py-3 outline-none transition-colors" />
```

## 6. Animation Language

- **Fade + Drift**: Elements fade in over `500ms–800ms` and drift upward `10px–20px`
- **Hover**: Gentle color or elevation transition, `ease-out`. No bounce or spring effects
- Use `motion` or `ScrollReveal` components for viewport-triggered reveals

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## 7. Protected Route

The `src/app/InteractiveSiteMap` directory is a **locked functional route**. Future changes are limited to visual styling only — applying the colors and typography from this document. Do not touch the hotspot logic, SVG mapping, panning/zooming math, or state management.
