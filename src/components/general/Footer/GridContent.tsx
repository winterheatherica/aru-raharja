import AboutBlock from "./Brand";
import ContactBlock from "./ContactBlock";
import QuickLinks from "./QuickLinks";
import PartnerBadges from "./PartnerBadges";

export default function GridContent() {
  return (
    <div
      className="
        z-20 grid
        grid-cols-1 lg:grid-cols-4
        gap-y-12 gap-x-16
        items-start justify-items-start
      "
    >
      <AboutBlock />
      <ContactBlock />
      <QuickLinks />
      <PartnerBadges />
    </div>
  );
}
