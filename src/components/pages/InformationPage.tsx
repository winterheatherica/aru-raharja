import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";

import Reports from "@/components/section/InformationPage/Reports/Reports";

import type { Locale, Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function InformationPage({ dict, locale }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440">
      <SmallHero hero={dict.information?.hero} illustrationSrc="/images/services/service-bg.png" />
      <Reports dict={dict} locale={locale} />
    </main>
  );
}
