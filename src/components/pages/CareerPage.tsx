import SmallHero from "@/components/general/BluePrint/SmallHero/SmallHero";

import Registration from "@/components/section/CareerPage/Registration/Registration";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
  site: {
    id: string;
    title: string;
    employment: string;
    location: string;
    description: string;
  }[];
};

export default function CareerPage({ dict, locale, site }: Props) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">
      <SmallHero hero={dict.career?.hero} illustrationSrc="/images/career/career-bg.png"/>
      <Registration dict={dict} vacancies={site ?? []} />
    </main>
  );
}