import type { Locale, Dictionary } from "@/i18n/getDictionary";
import { routeSlugByLocale } from "@/i18n/routes";

export const NAV_ORDER = [
  "about",
  "service",
  "reservation",
  "information",
  "appeal",
  "career",
] as const;

export type NavSegment = typeof NAV_ORDER[number];

type NavbarDict = Dictionary["header"]["navbar"];

export const SEGMENT_TO_KEY: Record<NavSegment, keyof NavbarDict> = {
  about: "about",
  service: "services",
  reservation: "reservation",
  information: "information",
  appeal: "appeal",
  career: "career",
};

export function getLabel(dict: Dictionary | undefined, segment: NavSegment): string {
  const key = SEGMENT_TO_KEY[segment];
  return dict?.header?.navbar?.[key] ?? segment;
}

export function navHref(locale: Locale, segment: NavSegment): string {
  return `/${locale}/${routeSlugByLocale[locale][segment]}`;
}
