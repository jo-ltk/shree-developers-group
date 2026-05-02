import type { Metadata } from "next";

import { InteractiveSiteMapClient } from "./InteractiveSiteMapClient";

export const metadata: Metadata = {
  title: "Interactive Site Map | Sydney Oaks",
  description: "Explore available homesites on the Sydney Oaks interactive community site map.",
};

export default function InteractiveSiteMapPage() {
  return <InteractiveSiteMapClient />;
}
