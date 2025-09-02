export type Locale = "id" | "en";

import en from "./dictionaries/en";
import id from "./dictionaries/id";

export type Dictionary = typeof en | typeof id;

export async function getDictionary(locale: Locale) {
  return locale === "en" ? en : id;
}
