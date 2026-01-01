"use client";

import * as React from "react";

import News from "./News/News";
// import AnnualReport from "./AnnualReport/AnnualReport";
// import SustainabilityReport from "./SustainabilityReport/SustainabilityReport";
// import MonthlyReport from "./MonthlyReport/MonthlyReport";
// import PressRelease from "./PressRelease/PressRelease";
// import Secure from "./Secure/Secure";

import SectionTitle from "./Template/SectionTitle/SectionTitle";

type Props = {
  activeId: string;
  dict: any;
  locale: string;
};

export default function Content({ activeId, dict, locale }: Props) {
  const sectionTitle =
    dict?.information?.reports?.sectionTitle?.[activeId] ?? {};

  const titleHtml = sectionTitle?.titleHtml || "";
  const description = sectionTitle?.description || "";

  let content: React.ReactNode = null;

  switch (activeId) {
    case "news":
      content = <News dict={dict} locale={locale} />;
      break;
    // case "annualreport":
    //   content = <AnnualReport dict={dict} locale={locale} />;
    //   break;
    // case "sustainabilityreport":
    //   content = <SustainabilityReport dict={dict} locale={locale} />;
    //   break;
    // case "monthlyreport":
    //   content = <MonthlyReport dict={dict} locale={locale} />;
    //   break;
    // case "pressrelease":
    //   content = <PressRelease dict={dict} locale={locale} />;
    //   break;
    // case "secure":
    //   content = <Secure dict={dict} locale={locale} />;
    //   break;
    // default:
    //   return null;
  }

  return (
    <section className="py-8 lg:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle titleHtml={titleHtml} description={description} />
        {content}
      </div>
    </section>
  );
}
