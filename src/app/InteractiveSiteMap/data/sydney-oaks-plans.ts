import { getProjectBySlug } from "@/lib/projects-data";

import { homePlansFromProject } from "./project-floor-plans";

export const SYDNEY_OAKS_TOWNHOME_PLANS = homePlansFromProject("sydney-oaks");

const sydneyOaks = getProjectBySlug("sydney-oaks");

export const SYDNEY_OAKS_COMMUNITY_SUMMARY =
  sydneyOaks?.summary ??
  "22-acre townhome community in Cumming with 3–4 bedroom homes starting in the low $400s.";
