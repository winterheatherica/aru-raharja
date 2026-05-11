import type { Locale } from "@/i18n/get_dictionary";

async function fetchFromAPI(
  endpoint: string,
  locale: Locale,
  init: RequestInit = { next: { revalidate: 3600 } }
) {
  const lang = locale.toUpperCase();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}${endpoint}?lang=${lang}`,
      init
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json ?? null;
  } catch {
    return null;
  }
}

export const fetchHome = (l: Locale) =>
  fetchFromAPI("/api/home", l);

export const fetchAbout = (l: Locale) =>
  fetchFromAPI("/api/about", l);

export const fetchReservation = (l: Locale) =>
  fetchFromAPI("/api/reservation", l);

export const fetchInformation = (l: Locale) =>
  fetchFromAPI("/api/information", l);

export const fetchCareer = (l: Locale) =>
  fetchFromAPI("/api/career", l);

export const fetchService = (l: Locale) =>
  fetchFromAPI("/api/service", l);
