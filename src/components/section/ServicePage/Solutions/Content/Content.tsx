"use client";

import * as React from "react";
import Arudigital from "./Arudigital/Arudigital";
import Aruhealthcare from "./Aruhealthcare/Aruhealthcare";

type DictShape = {
  service?: {
    solutions?: {
      arudigital?: {
        titleHtml?: string;
        description?: string;
        altIllustration?: string;
      };
    };
  };
};

type Props = {
  activeId: string;
  dict: DictShape;
  locale: string;
};

export default function Content({ activeId, dict, locale }: Props) {
  switch (activeId) {
    case "arudigital": return <Arudigital dict={dict} locale={locale} />;
    case "aruhealthcare": return <Aruhealthcare dict={dict} locale={locale} />;
    // case "arucontractor": return <Arucontractor dict={dict} locale={locale} />;
    // case "arusource": return <Arusource dict={dict} locale={locale} />;
    // case "arusolution": return <Arusolution dict={dict} locale={locale} />;
    // case "arulog": return <Arulog dict={dict} locale={locale} />;
    // case "arutrans": return <Arutrans dict={dict} locale={locale} />;
    // case "aruspace": return <Aruspace dict={dict} locale={locale} />;
    default:
    return null;
  }
}
