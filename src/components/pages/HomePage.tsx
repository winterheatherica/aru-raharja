import Masking from "@/components/section/HomePage/Masking/Masking";
import Hero from "@/components/section/HomePage/Hero/Hero";
import DutiesPromo from "@/components/section/HomePage/DutiesPromo/DutiesPromo";
import Funding from "@/components/section/HomePage/Funding/Funding";
import StatsCtaMap from "@/components/section/HomePage/StatsCtaMap/StatsCtaMap";
import Service from "@/components/section/HomePage/Service/Service";
import News from "@/components/section/HomePage/News/News";
import Videos from "@/components/section/HomePage/Videos/Videos";
import QuickLinks from "@/components/section/HomePage/QuickLinks/QuickLinks";
import Partner from "@/components/section/HomePage/Partners/Partners";
import PartnerScroller from "@/components/section/HomePage/PartnerScroller/PartnerScroller";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function HomePage({ dict, locale }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <Masking position="fixed" />
      <Hero dict={dict} locale={locale} />
      <DutiesPromo dict={dict} locale={locale} />
      <Funding dict={dict} />
      <StatsCtaMap dict={dict} locale={locale} />
      <Service dict={dict} locale={locale} />
      <News dict={dict} />
      <Videos dict={dict} />
      <Partner dict={dict} />
      <PartnerScroller />
      <QuickLinks dict={dict} />
    </main>
  );
}
