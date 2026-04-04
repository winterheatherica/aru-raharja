"use client";

import Link from "next/link";
import { roomHref } from "@/i18n/param_routes";

type RoomAPI = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  main_image_url?: string;
  main_image_alt?: string;
  capacity?: number;
  floor?: number;
  facilities: string[];
};

type Props = {
  dict: any;
  locale: string;
  rooms: RoomAPI[];
};

export default function RoomList({ dict, locale, rooms }: Props) {
  const roomlist = dict.reservation.roomlist;

  if (!rooms.length) {
    return (
      <section className="py-12 text-center text-bumngray-6">
        {roomlist.emptyText ?? "No rooms available"}
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6 px-2 md:px-16 lg:px-24">
        <h3 className="text-xl lg:text-2xl font-semibold text-bumnblue-2">
          {roomlist.title}
        </h3>
        <div className="text-sm text-bumngray-6">
          {roomlist.subtitle}
        </div>
      </div>

      <div className="px-2 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-6">
          {rooms.map((r) => (
            <article
              key={r.id}
              className="flex flex-col sm:flex-row items-stretch gap-4 bg-bumn-gradient-white-4 border border-bumnslate-10 rounded-xl p-4 shadow-bumn-2 transition-shadow"
            >
              <div className="h-44 w-full sm:h-36 sm:w-48 rounded-lg overflow-hidden flex-shrink-0 bg-bumnwhite-1">
                <img
                  src={r.main_image_url || ""}
                  alt={r.main_image_alt || r.title}
                  className="block h-full w-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='100%' height='100%' fill='%23F8F8F8'/%3E%3Ctext x='50%' y='50%' fill='%239CA7C4' font-size='14' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E")
                  }
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-md lg:text-lg font-semibold text-bumnblue-2 pt-3 sm:pt-0 pb-2 sm:pb-0">
                        {r.title}
                      </h4>
                      {r.description && (
                        <div
                          className="text-sm text-bumngray-6 [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1"
                          dangerouslySetInnerHTML={{ __html: r.description }}
                        />
                      )}
                    </div>

                    <div className="hidden sm:flex flex-col items-end pr-3">
                      {r.floor !== undefined && (
                        <div className="text-xs text-bumngray-5 mt-1">
                          Floor {r.floor}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {r.capacity !== undefined && (
                      <div className="text-sm text-bumngray-6 mr-3">
                        <span className="font-medium text-bumnblue-2">
                          {r.capacity}
                        </span>{" "}
                        <span className="text-xs">
                          {roomlist.capacityLabel}
                        </span>
                      </div>
                    )}

                    {r.facilities.slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-1 bg-bumnwhite-1 border border-bumngray-8 rounded-full text-bumngray-6"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-bumngray-6">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
                      <span className="text-sm">
                        {roomlist.availableLabel}
                      </span>
                    </span>
                  </div>

                  <div className="mt-0 sm:ml-auto sm:mt-0 w-full sm:w-auto">
                    <Link
                      href={roomHref(locale, r.slug)}
                      className={`flex w-full sm:inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium shadow transition ${
                        "bg-bumn-gradient-primary-11 text-white hover:opacity-95 shadow-bumn-2"
                      }`}
                      aria-disabled={false}
                    >
                      {roomlist.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
