import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

let registered = false;

export function ensureGsapPlugins() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return { gsap, ScrollTrigger };
}
