import AboutBlock from "./CompanyLogo";
import ContactBlock from "./ContactBlock";
import QuickLinks from "./QuickLinks";
import PartnerBadges from "./PartnerBadges";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

export default function GridContent({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <div
      className="
        z-20 grid
        grid-cols-1 lg:grid-cols-4
        gap-y-12 gap-x-16
        items-start justify-items-start
      "
    >
      <AboutBlock dict={dict} />
      <ContactBlock dict={dict} />
      <QuickLinks dict={dict} locale={locale} />
      <PartnerBadges />
    </div>
  );
}

