"use client";

import { getEmploymentLabel } from "./type";
import type { Dictionary } from "@/i18n/get_dictionary";
import { buildJobApplicationGmail } from "./emailTemplate";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

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

function ResultItem({
  job,
  i,
  dict,
  applyLabel,
}: {
  job: Vacancy;
  i: number;
  dict: Dictionary;
  applyLabel?: string;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={`p-6 rounded-2xl bg-bumn-gradient-white-4 border border-bumnslate-10 shadow-bumn-2 text-bumnslate-6 flex flex-col justify-between transition-all duration-[1000ms] ease-out will-change-transform will-change-opacity ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div>
        <h3 className="text-xl font-bold mb-2 text-bumnblue-8">
          {job.title}
        </h3>

        <p className="text-sm text-bumnslate-8 mb-2">
          {getEmploymentLabel(job.employment as any, dict)} • {job.location}
        </p>

        <p className="text-base text-bumnslate-6 mb-4">
          {job.description}
        </p>
      </div>

      <a
        href={buildJobApplicationGmail(job.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white font-semibold shadow-bumn-2 transition hover:opacity-95 active:scale-[0.98]"
      >
        {applyLabel}
      </a>
    </li>
  );
}

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
        {vacancies.map((job, i) => (
          <ResultItem
            key={job.id}
            job={job}
            i={i}
            dict={dict}
            applyLabel={t?.applyButton}
          />
        ))}
      </ul>
    </section>
  );
}

