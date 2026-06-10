import type { HomePlan } from "../types/site-map";
import { SYDNEY_OAKS_TOWNHOME_PLANS } from "./sydney-oaks-plans";

/** A = Aspen, B = Birch, E = Elm — per original Sydney Oaks site plan assignments */
export type SydneyOaksPlanLetter = "A" | "B" | "E";

const LETTER_TO_PLAN_ID: Record<SydneyOaksPlanLetter, string> = {
  A: "aspen",
  B: "birch",
  E: "elm",
};

/** Homes with explicit series assignments on the site plan */
export const SYDNEY_OAKS_LOT_PLAN_LETTER: Partial<Record<number, SydneyOaksPlanLetter>> = {
  1: "A",
  2: "B",
  3: "A",
  4: "B",
  5: "A",
  6: "B",
  7: "B",
  8: "A",
  9: "A",
  10: "A",
  11: "A",
  12: "A",
  35: "E",
  36: "A",
  37: "B",
  38: "E",
  39: "A",
  40: "B",
  41: "A",
  42: "E",
  43: "A",
  44: "B",
  45: "E",
  46: "E",
};

export function sydneyOaksPlanLetterForLot(lotId: number): SydneyOaksPlanLetter {
  return SYDNEY_OAKS_LOT_PLAN_LETTER[lotId] ?? "A";
}

export function sydneyOaksPlanForLot(lotId: number): HomePlan {
  const letter = sydneyOaksPlanLetterForLot(lotId);
  const planId = LETTER_TO_PLAN_ID[letter];
  const plan = SYDNEY_OAKS_TOWNHOME_PLANS.find((entry) => entry.id === planId);
  if (!plan) {
    return SYDNEY_OAKS_TOWNHOME_PLANS[0];
  }
  return plan;
}
