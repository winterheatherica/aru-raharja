"use client";

import HistoryTabs, { type HistoryItem } from "./HistoryTabs";
import type { Dictionary } from "@/i18n/get_dictionary";

type ApiHistory = {
  year: number;
  title?: string;
  description?: string;
  table_headers?: string[];
  table_rows?: string[][];
};

type HistoryDict = {
  title: string;
  intro: string;
};

type Props = {
  dict?: Dictionary;
  histories?: ApiHistory[];
};

export default function History({ dict, histories }: Props) {
  const t = dict?.about?.history as HistoryDict | undefined;
  if (!t || !histories?.length) return null;

  const items: HistoryItem[] = histories.map((h) => ({
    year: String(h.year),
    content: (
      <>
        {h.title && <h4 className="text-xl font-semibold">{h.title}</h4>}
        {h.description && <p>{h.description}</p>}

        {h.table_headers && h.table_rows && (
          <table className="w-full mt-4 text-bumnslate-6 border-collapse">
            <thead className="text-sm font-bold text-left bg-bumngray-2/20">
              <tr>
                {h.table_headers.map((head, i) => (
                  <th
                    key={i}
                    className="p-3 border border-bumngray-2"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-base font-lato">
              {h.table_rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="p-3 border border-bumngray-2 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    ),
  }));

  items.sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <section className="mt-8 lg:mt-14">
      <div className="mt-10 space-y-6 font-semibold font-lato text-[18px] leading-[30px]">
        <h3 className="text-2xl font-bold font-helvetica text-bumngreen-1">
          {t.title}
        </h3>
        <p>{t.intro}</p>
      </div>

      <HistoryTabs items={items} defaultYear={items[0]?.year} />
    </section>
  );
}
