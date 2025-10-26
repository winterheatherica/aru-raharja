"use client";

import React from "react";
import Filters from "./Filters";
import Results from "./Results";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = { dict: Dictionary };

export default function Registration({ dict }: Props) {
  return (
    <section aria-label="Career Registration" className="mt-10 lg:px-10">
      <Filters dict={dict} />
      <Results dict={dict} />
    </section>
  );
}
