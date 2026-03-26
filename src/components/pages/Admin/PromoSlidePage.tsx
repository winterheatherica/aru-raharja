import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import TemplatePage from "./_TemplatePage";

export default function PromoSlidePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  return <TemplatePage locale={locale} dict={dict} title="Admin Promo Slide" text="ini page promo slide" />;
}