export function mapHeroHref(banner: string, locale: string) {
  switch (banner) {
    case "FAQ":
      return `/${locale}/faq`;
    case "SERVICE":
      return `/${locale}/service`;
    case "COMPLAINT":
      return `/${locale}/complaint`;
    case "NEWS":
      return `/${locale}/news`;
    case "POLISH":
    default:
      return null;
  }
}
