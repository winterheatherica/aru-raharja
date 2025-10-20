import Masking from "@/components/section/HomePage/Masking/Masking";
import Hero from "@/components/section/AboutPage/Hero/Hero";
import VisionMission from "@/components/section/AboutPage/VisionMission/VisionMission";
import History from "@/components/section/AboutPage/History/History";
import Business from "@/components/section/AboutPage/Business/Business";
import Culture from "@/components/section/AboutPage/Culture/Culture";
import Subsidiary from "@/components/section/AboutPage/Subsidiary/Subsidiary";
import Awards from "@/components/section/AboutPage/Awards/Awards";

import type { Locale, Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function AboutPage({ dict, locale }: Props) {
  return (
    <main className="relative px-10 lg:px-4 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <Masking position="absolute" />
      <Hero dict={dict} />
      <div className="max-w-[1014px] mx-auto">
        <VisionMission dict={dict} />
        <History dict={dict} />
        <Business dict={dict} />
        <Culture dict={dict} />
        <Subsidiary dict={dict} />
        <Awards dict={dict} />
      </div>
    </main>
  );
}
