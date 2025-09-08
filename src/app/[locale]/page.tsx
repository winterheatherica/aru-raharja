import Hero from "@/components/section/HomePage/Hero/Hero";
import DutiesPromo from "@/components/section/HomePage/DutiesPromo/DutiesPromo";
import Funding from "@/components/section/HomePage/Funding/Funding";
import StatsCtaMap from "@/components/section/HomePage/StatsCtaMap/StatsCtaMap";
import Service from "@/components/section/HomePage/Service/Service";
// import QuickLinks from "@/components/section/HomePage/QuickLinks/QuickLinks";
// import Videos from "@/components/section/HomePage/Videos/Videos";

import { getDictionary, type Locale } from "@/i18n/getDictionary";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative px-2 py-2 mx-auto max-w-screen-1440">
        <Hero dict={dict} locale={locale} />
        <DutiesPromo dict={dict} locale={locale} />
        <Funding dict={dict} />
        <StatsCtaMap dict={dict} locale={locale}  />
        <Service dict={dict} locale={locale}  />
    </main>
  );
}
