import { normalizeLocale, type Locale } from "./routes";

export const dynamicSegmentByLocale = {
  en: {
    article: "article",
    room: "room",
    service: "service",
  },
  id: {
    article: "artikel",
    room: "ruangan",
    service: "layanan",
  },
} as const;

type SupportedLocale = keyof typeof dynamicSegmentByLocale;

function loc(l: string | Locale): SupportedLocale {
  const n = normalizeLocale(typeof l === "string" ? l : String(l));
  if (n.startsWith("id")) return "id";
  return "en";
}

function joinPath(...parts: Array<string | undefined | null>) {
  const segs = parts
    .filter(Boolean)
    .map((p) => String(p))
    .map((p) => p.split("/").map((s) => encodeURIComponent(s)).join("/"));
  return "/" + segs.join("/").replace(/\/+/g, "/").replace(/\/$/, "");
}

export const articleHref = (l: string | Locale, slug: string) => {
  const locale = loc(l);
  return joinPath(locale, dynamicSegmentByLocale[locale].article, slug);
};

export const roomHref = (l: string | Locale, roomId: string) => {
  const locale = loc(l);
  return joinPath(locale, dynamicSegmentByLocale[locale].room, roomId);
};

export const reservationRoomHref = (l: string | Locale, roomId: string) => {
  const locale = loc(l);
  return joinPath(locale, dynamicSegmentByLocale[locale].room, roomId);
};

export const serviceHref = (l: string | Locale, solution: string) => {
  const locale = loc(l);
  return joinPath(locale, dynamicSegmentByLocale[locale].service, solution);
};

export const roomApiPath = (roomId: string) =>
  joinPath("api", "rooms", roomId);

export const canonicalUrl = (origin: string | undefined, path: string) => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  if (!origin) return safePath;
  return `${origin.replace(/\/$/, "")}${safePath}`;
};

export const canonicalRoomUrl = (
  origin: string | undefined,
  l: string | Locale,
  roomId: string
) => canonicalUrl(origin, roomHref(l, roomId));

export const canonicalArticleUrl = (
  origin: string | undefined,
  l: string | Locale,
  slug: string
) => canonicalUrl(origin, articleHref(l, slug));

export const canonicalServiceUrl = (
  origin: string | undefined,
  l: string | Locale,
  solution: string
) => canonicalUrl(origin, serviceHref(l, solution));

export default {
  dynamicSegmentByLocale,
  articleHref,
  roomHref,
  reservationRoomHref,
  serviceHref,
  roomApiPath,
  canonicalUrl,
  canonicalRoomUrl,
  canonicalArticleUrl,
  canonicalServiceUrl,
};
