import type { Locale } from "@/i18n/get_dictionary";

async function fetchFromAPI(endpoint: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}${endpoint}?lang=${lang}`,
    { cache: "force-cache" }
  );

    if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export const fetchHome = (l: Locale) =>
  fetchFromAPI("/api/home", l).then((data) => ({ home: data }));

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
