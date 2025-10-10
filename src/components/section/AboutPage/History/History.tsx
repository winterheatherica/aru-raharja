"use client";

import HistoryTabs, { type HistoryItem } from "./HistoryTabs";
import type { Dictionary } from "@/i18n/getDictionary";

type HistoryDict = {
  title: string;
  intro: string;
  items: ReadonlyArray<{
    year: string | number;
    content?: ReadonlyArray<string>;
    table?: {
      headers: ReadonlyArray<string>;
      rows: ReadonlyArray<ReadonlyArray<string>>;
    };
  }>;
};

type Props = {
  dict?: Dictionary;
};

export default function History({ dict }: Props) {
  const t = dict?.about?.history as HistoryDict | undefined;
  if (!t) return null;

  const items: HistoryItem[] = (t.items ?? []).map((it) => ({
    year: String(it.year),
    content: (
      <>
        {(it.content ?? []).map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {it.table && (
          <table className="text-bumnslate-6 w-full">
            <thead className="text-sm font-bold text-left bg-bumngray-2/20">
              <tr>
                {it.table.headers.map((h, hIdx) => (
                  <th key={hIdx} className="p-3 border border-bumngray-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-base font-lato">
              {it.table.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 border border-bumngray-2 align-top">
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
