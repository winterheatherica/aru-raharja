// src/i18n/dynamic_routes.ts
import { normalizeLocale, routeSlugByLocale, type Locale } from "./routes";

export const dynamicSegmentByLocale = {
  en: {
    article: "article",
    room: "room",
  },
  id: {
    article: "artikel",
    room: "ruangan",
  },
} as const;

function loc(l: string | Locale): Locale {
  return normalizeLocale(typeof l === "string" ? l : (l as string));
}

function joinPath(...parts: Array<string | undefined | null>) {
  const segs = parts
    .filter(Boolean)
    .map((p) => String(p))
    .map((p) => p.split("/").map((s) => encodeURIComponent(s)).join("/"));
  return "/" + segs.join("/").replace(/\/+/g, "/").replace(/\/$/, "");
}

export const reservationHref = (l: string | Locale) => {
  const locale = loc(l);
  return joinPath(locale, routeSlugByLocale[locale].reservation);
};

export const articleHref = (l: string | Locale, slug: string) => {
  const locale = loc(l);
  const base = dynamicSegmentByLocale[locale].article;
  return joinPath(locale, base, slug);
};

export const roomHref = (l: string | Locale, roomId: string) => {
  const locale = loc(l);
  const base = dynamicSegmentByLocale[locale].room;
  return joinPath(locale, base, roomId);
};

export const reservationRoomHref = (l: string | Locale, roomId: string) => {
  const locale = loc(l);
  const reservationBase = routeSlugByLocale[locale].reservation;
  const roomBase = dynamicSegmentByLocale[locale].room;
  return joinPath(locale, reservationBase, roomBase, roomId);
};

export const roomApiPath = (roomId: string) => joinPath("api", "rooms", roomId);

export const canonicalUrl = (origin: string | undefined, path: string) => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  if (!origin) return safePath;
  return `${origin.replace(/\/$/, "")}${safePath}`;
};

export const canonicalRoomUrl = (origin: string | undefined, l: string | Locale, roomId: string) =>
  canonicalUrl(origin, roomHref(l, roomId));

export const canonicalArticleUrl = (origin: string | undefined, l: string | Locale, slug: string) =>
  canonicalUrl(origin, articleHref(l, slug));

export default {
  dynamicSegmentByLocale,
  reservationHref,
  articleHref,
  roomHref,
  reservationRoomHref,
  roomApiPath,
  canonicalUrl,
  canonicalRoomUrl,
  canonicalArticleUrl,
};
