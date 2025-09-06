import type { Dictionary } from "@/i18n/getDictionary";

export const NAV_ORDER = [
  "about",
  "service",
  "complaint",
  "governance",
  "information",
  "appeal",
  "career",
] as const;

export type NavSegment = typeof NAV_ORDER[number];

export const SEGMENT_TO_KEY: Record<NavSegment, keyof Dictionary["navbar"]> = {
  about: "about",
  service: "services",
  complaint: "complaint",
  governance: "governance",
  information: "information",
  appeal: "appeal",
  career: "career",
};

export function getLabel(dict: Dictionary | undefined, segment: NavSegment): string {
  const key = SEGMENT_TO_KEY[segment];
  return dict?.navbar?.[key] ?? segment;
}
