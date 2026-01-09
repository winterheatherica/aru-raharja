import Masking from "@/components/section/HomePage/Masking/Masking";
import Hero from "@/components/section/AboutPage/Hero/Hero";
import VisionMission from "@/components/section/AboutPage/VisionMission/VisionMission";
import History from "@/components/section/AboutPage/History/History";
import Business from "@/components/section/AboutPage/Business/Business";
import Culture from "@/components/section/AboutPage/Culture/Culture";
import Partner from "@/components/section/HomePage/Partners/Partners";
import Awards from "@/components/section/AboutPage/Awards/Awards";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type AboutSiteData = {
  histories?: any[];
  awards?: any[];
};

type Props = {
  dict: Dictionary;
  locale: Locale;
  site: AboutSiteData;
};

export default function AboutPage({ dict, locale, site }: Props) {
  const histories = site?.histories ?? [];
  const awards = site?.awards ?? [];

  return (
    <main className="relative px-10 lg:px-4 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <Masking position="absolute" />
      <Hero dict={dict} />
      <div className="max-w-[1014px] mx-auto">
        <VisionMission dict={dict} />
        <History dict={dict} histories={histories} />
        <Business dict={dict} />
        <Culture dict={dict} />
      </div>
      <Partner dict={dict} />
      <div className="max-w-[1014px] mx-auto">
        <Awards dict={dict} awards={awards} />
      </div>
    </main>
  );
}
