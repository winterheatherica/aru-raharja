import type { Locale } from "@/i18n/getDictionary";
import Appeal from "@/components/section/AppealPage/Appeal";
import Videos from "@/components/section/HomePage/Videos/Videos";
import QuickLinks from "@/components/section/HomePage/QuickLinks/QuickLinks";

export default function AppealPage({
  dict,
  locale,
}: {
  dict: any;
  locale: Locale;
}) {
  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440">
      <Appeal />
      <Videos dict={dict} />
      <QuickLinks dict={dict} />
    </main>
  );
}
