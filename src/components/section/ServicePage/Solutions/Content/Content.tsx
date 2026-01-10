"use client";

import ServiceDescription from "./Template/Description/Description";
import Pricing from "./Template/Pricing/Pricing";
import Gallery from "./Template/Gallery/Gallery";

type Props = {
  activeId: string;
  dict: any;
  site?: any;
};

export default function Content({ activeId, dict, site }: Props) {
  const desc = dict?.service?.solutions?.descriptions?.[activeId];
  const apiData = site?.service ?? site;
  const serviceCode = activeId.toUpperCase();
  const serviceData = apiData?.[serviceCode];
  const pricing = serviceData?.pricing ?? [];
  const gallery = serviceData?.gallery ?? [];

  if (!desc) return null;

  const pricingTexts = {
    toggleMonthly: dict?.service?.pricing?.toggle?.monthly ?? "Monthly",
    toggleYearly: dict?.service?.pricing?.toggle?.yearly ?? "Yearly",
    popularBadge: dict?.service?.pricing?.popularBadge ?? "Most Popular",
    cta: dict?.service?.pricing?.cta ?? "Choose Plan",
    periodMonthly: dict?.service?.pricing?.period?.monthly ?? "mo",
    periodYearly: dict?.service?.pricing?.period?.yearly ?? "yr",
  };

  return (
    <div className="space-y-10 pb-10">
      <ServiceDescription title={desc.title} description={desc.description} />
      <Pricing items={pricing} texts={pricingTexts} />
      {gallery.length > 0 && ( <Gallery items={gallery} /> )}
    </div>
  );
}
