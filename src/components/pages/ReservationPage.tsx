import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";

import Intro from "@/components/section/ReservationPage/Intro/Intro";
import RoomList from "@/components/section/ReservationPage/RoomList/RoomList";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function ReservationPage({ dict, locale }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <SmallHero hero={dict.reservation?.hero} illustrationSrc="/images/services/service-bg.png" />
      <Intro dict={dict} locale={locale} />
      <RoomList dict={dict} locale={locale} />
    </main>
  );
}
