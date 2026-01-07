"use client";

import React from "react";
import Filters from "./Filters";
import Results from "./Results";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  vacancies: any[];
};

export default function Registration({ dict, vacancies }: Props) {
  return (
    <section aria-label="Career Registration" className="mt-10 lg:px-10">
      <Filters dict={dict} />
      <Results dict={dict} vacancies={vacancies} />
    </section>
  );
}
