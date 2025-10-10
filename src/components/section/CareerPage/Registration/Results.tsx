"use client";

import React from "react";
import type { Dictionary } from "@/i18n/getDictionary";

type Props = { dict: Dictionary };

export default function Results({ dict }: Props) {
  const t = dict.career?.registration?.results;
  const vacancies = t?.vacancies ?? [];

  if (!vacancies.length) {
    return (
      <section className="mt-4 lg:mt-8">
        <div className="flex items-center justify-center text-lg font-lato h-[300px]">
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
            className="p-6 border rounded-lg shadow-sm bg-white text-bumnslate-6"
          >
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-sm text-bumngray-6 mb-1">
              {job.type} • {job.location}
            </p>
            <p className="text-base">{job.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
