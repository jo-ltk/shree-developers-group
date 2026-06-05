import { getProjectBySlug } from "@/lib/projects-data";

import type { HomePlan } from "../types/site-map";

function planIdFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Floor plans for the interactive map, sourced from each project's floorPlansDetails. */
export function homePlansFromProject(slug: string): HomePlan[] {
  const details = getProjectBySlug(slug)?.floorPlansDetails;
  if (!details?.length) return [];

  return details.map((plan) => ({
    id: planIdFromName(plan.name),
    name: plan.name,
    seriesLetter: plan.seriesLetter,
    sqft: plan.area,
    beds: plan.bedrooms,
    baths: plan.bathrooms,
    garage: plan.parking,
    story: "Two Story",
    image: plan.image,
  }));
}

export function formatPlanNameList(plans: HomePlan[]): string {
  const names = plans.map((plan) => plan.name);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} or ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, or ${names[names.length - 1]}`;
}
