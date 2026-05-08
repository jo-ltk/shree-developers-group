import type { Metadata } from "next";

import { InteractiveSiteMapClient } from "./InteractiveSiteMapClient";

export const metadata: Metadata = {
  title: "Explore Available Homesites | Shree Developers Group",
  description: "A premium interactive homesite map experience for Shree Developers Group communities.",
};

export default function InteractiveSiteMapPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  return <InteractiveSiteMapClient initialProject={searchParams} />;
}
