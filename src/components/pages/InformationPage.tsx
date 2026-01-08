import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";
import Reports from "@/components/section/InformationPage/Reports/Reports";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
  site: {
    news_cards?: any[];
    news_years?: number[];
  };
};

export default function InformationPage({ dict, locale, site }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <SmallHero hero={dict.information?.hero} illustrationSrc="/images/services/service-bg.png" />
      <Reports dict={dict} locale={locale} site={site} />
    </main>
  );
}
