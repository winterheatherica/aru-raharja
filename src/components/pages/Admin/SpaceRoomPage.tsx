import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import TemplatePage from "./_TemplatePage";

export default function SpaceRoomPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  return <TemplatePage locale={locale} dict={dict} title="Admin Space Room" text="ini page space room" />;
}