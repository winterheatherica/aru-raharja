import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";

import Videos from "@/components/section/HomePage/Videos/Videos";
import QuickLinks from "@/components/section/HomePage/QuickLinks/QuickLinks";

import type { Locale, Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function AppealPage({ dict, locale }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440">
      <SmallHero hero={dict.appeal?.hero} illustrationSrc="/images/services/service-bg.png" />
      <Videos dict={dict} />
      <QuickLinks dict={dict} />
    </main>
  );
}