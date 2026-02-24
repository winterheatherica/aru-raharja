"use client";

import React from "react";
import type { Dictionary } from "@/i18n/get_dictionary";
import { buildJobApplicationGmail } from "./emailTemplate";

type Vacancy = {
  id: string;
  title: string;
  employment: string;
  location: string;
  description: string;
};

type Props = {
  dict: Dictionary;
  vacancies: Vacancy[];
};

export default function Results({ dict, vacancies }: Props) {
  const t = dict.career?.registration?.results;

  if (!vacancies || vacancies.length === 0) {
    return (
      <section className="mt-4 lg:mt-8">
        <div className="flex items-center justify-center text-lg font-lato h-[300px] text-bumnslate-6">
          {t?.emptyText}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-4 lg:mt-8">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((job) => (
          <li
            key={job.id}
            className="
              p-6 rounded-2xl
              bg-bumn-gradient-white-4
              border border-bumngray-7
              shadow-bumn-2
              text-bumnslate-6
              flex flex-col justify-between
            "
          >
            <div>
              <h3 className="text-xl font-bold mb-2 text-bumnblue-8">
                {job.title}
              </h3>

              <p className="text-sm text-bumnslate-8 mb-2">
                {job.employment} • {job.location}
              </p>

              <p className="text-base text-bumnslate-6 mb-4">
                {job.description}
              </p>
            </div>

            <a
              href={buildJobApplicationGmail(job.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4 inline-flex items-center justify-center
                rounded-xl
                bg-bumn-gradient-primary-7 px-4 py-2 text-white font-semibold shadow-bumn-2 transition hover:opacity-95 active:scale-[0.98]
              "
            >
              {t?.applyButton}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

