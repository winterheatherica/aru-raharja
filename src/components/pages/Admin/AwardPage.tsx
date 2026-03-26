import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import AwardListPage from "./AwardPage/AwardListPage";

export default function AwardPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  return <AwardListPage locale={locale} dict={dict} />;
}
