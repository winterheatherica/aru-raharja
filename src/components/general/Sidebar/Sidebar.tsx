import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import SidebarAdmin from "@/components/general/SidebarAdmin/SidebarAdmin";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function Sidebar({ dict, locale }: Props) {
  return <SidebarAdmin locale={locale} dict={dict} />;
}
