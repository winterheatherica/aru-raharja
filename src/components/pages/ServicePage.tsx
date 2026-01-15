import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";
import Solutions from "@/components/section/ServicePage/Solutions/Solutions";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
  activeSolution?: string;
  site?: any;
};

export default function ServicePage({
  dict,
  locale,
  activeSolution = "arudigital",
  site,
}: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <SmallHero hero={dict.service?.hero} illustrationSrc="/images/services/service-bg.png" />
      <Solutions dict={dict} locale={locale} value={activeSolution} site={site} />
    </main>
  );
}
