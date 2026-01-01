export type CanonicalPage =
  | "home"
  | "about"
  | "service"
  | "reservation"
  | "information"
  // | "appeal"
  | "career"
  | "login"
  | "admin"

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}
export function normalizeLocale(x: string | undefined): Locale {
  if (!x) return "id";
  const lc = x.toLowerCase().trim();
  return isLocale(lc) ? lc : "id";
}

export const routeSlugByLocale = {
  en: {
    home: "home",
    about: "about",
    service: "service",
    reservation: "reservation",
    information: "information",
    // appeal: "appeal",
    career: "career",
    login: "login",
    admin: "admin",
  },
  id: {
    home: "beranda",
    about: "tentang",
    service: "layanan",
    reservation: "reservasi",
    information: "informasi",
    // appeal: "himbauan",
    career: "karier",
    login: "login",
    admin: "admin",
  },
} as const;

export function getRouteMap(l: string | Locale) {
  const safe = normalizeLocale(typeof l === "string" ? l : (l as string));
  return routeSlugByLocale[safe];
}

export const canonicalBySlug = (l: string | Locale) => {
  const map = getRouteMap(l);
  const pairs = Object.entries(map) as [CanonicalPage, string][];
  return Object.fromEntries(pairs.map(([key, slug]) => [slug, key])) as Record<
    string,
    CanonicalPage
  >;
};

export const href = (l: string | Locale, page: CanonicalPage) => {
  const map = getRouteMap(l);
  return `/${normalizeLocale(l)}/${map[page]}`;
};
