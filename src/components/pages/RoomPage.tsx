"use client";

import Link from "next/link";
import React from "react";
import { roomHref } from "@/i18n/param_routes";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
  id: string;
};

export default function RoomPage({ dict, locale, id }: Props) {
  const listRooms: any[] = (dict as any).reservation?.roomlist?.list ?? [];
  let room = listRooms.find((r) => String(r.id) === String(id));
  if (!room && (dict as any).room?.meta?.id === id) {
    room = (dict as any).room;
  }

  if (!room) {
    return (
      <main className="px-4 py-12 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-semibold text-bumnblue-2 mb-4">Room not found</h1>
        <p className="text-bumngray-6 mb-6">
          The room with id <strong>{id}</strong> could not be found.
        </p>
        <Link
          href={roomHref(locale, id)}
          className="inline-block px-4 py-2 rounded-md bg-bumngray-3 text-bumngray-6"
        >
          Back
        </Link>
      </main>
    );
  }

  const isDetailed = Boolean((room as any).meta);
  const meta = isDetailed ? (room as any).meta : room;
  const gallery = isDetailed ? (room as any).gallery?.images ?? [] : [{ src: room.img, alt: room.title }];

  return (
    <main className="px-4 py-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-semibold text-bumnblue-2">{meta.title}</h1>
            {meta.subtitle && <p className="text-sm text-bumngray-6 mt-2">{meta.subtitle}</p>}
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-auto flex items-center gap-4">
            <div className="text-sm text-bumngray-6 text-right">
              <div className="font-semibold text-bumnblue-2">{meta.pricePerHour ?? meta.price}</div>
              <div className="text-xs">{(dict as any).reservation?.roomlist?.priceLabel ?? "Price"}</div>
            </div>

            <Link
              href={roomHref(locale, id)}
              className="inline-flex items-center px-4 py-2 rounded-md bg-bumnblue-2 text-white text-sm font-medium shadow"
            >
              {(dict as any).reservation?.roomlist?.ctaLabel ?? "View & Book"}
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="w-full rounded-lg overflow-hidden bg-bumnwhite-1">
            <img
              src={gallery[0]?.src ?? meta.heroImage ?? meta.img}
              alt={gallery[0]?.alt ?? meta.title}
              className="w-full h-64 object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%' height='100%' fill='%23F8F8F8'/%3E%3Ctext x='50%' y='50%' fill='%239CA7C4' font-size='18' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E")
              }
            />
          </div>

          {isDetailed && (room as any).description?.paragraph ? (
            <section className="prose max-w-none text-bumngray-6" dangerouslySetInnerHTML={{ __html: (room as any).description.paragraph }} />
          ) : (
            <p className="text-bumngray-6">
              {meta.subtitle ?? "No additional description available for this room."}
            </p>
          )}

          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {gallery.slice(0, 6).map((g: any, i: number) => (
                <div key={i} className="rounded-lg overflow-hidden h-20">
                  <img
                    src={g.src}
                    alt={g.alt ?? `${meta.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-bumngray-8 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-bumnblue-2 mb-3">
              {(room as any).facilities?.title ?? (dict as any).reservation?.roomlist?.amenitiesTitle ?? "Facilities"}
            </h3>

            <ul className="text-sm text-bumngray-6 space-y-2">
              {isDetailed
                ? (room as any).facilities?.list?.map((f: any) => (
                    <li key={f.label} className="flex justify-between">
                      <span className="text-bumngray-6">{f.label}</span>
                      <span className="font-medium text-bumnblue-2">{f.value}</span>
                    </li>
                  ))
                : (room as any).amenities?.map((a: string) => (
                    <li key={a} className="text-bumngray-6">• {a}</li>
                  ))}
            </ul>
          </div>

          <div className="bg-white border border-bumngray-8 rounded-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-bumnblue-2 mb-2">{(room as any).booking?.title ?? "Booking Information"}</h4>
            <div className="text-sm text-bumngray-6 space-y-2">
              {(room as any).booking?.details
                ? (room as any).booking.details.map((d: any) => (
                    <div key={d.label} className="flex justify-between">
                      <span>{d.label}</span>
                      <span className="text-bumnblue-2 font-medium">{d.value}</span>
                    </div>
                  ))
                : (
                  <>
                    <div className="flex justify-between">
                      <span>Availability</span>
                      <span className="text-bumnblue-2 font-medium">{meta.available ? (dict as any).reservation?.roomlist?.availableLabel ?? "Available" : (dict as any).reservation?.roomlist?.unavailableLabel ?? "Unavailable"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span className="text-bumnblue-2 font-medium">${meta.pricePerHour ?? meta.price}</span>
                    </div>
                  </>
                )}
            </div>

            <div className="mt-4">
              <Link
                href={roomHref(locale, id)}
                className={`w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium shadow ${
                  meta.available ? "bg-bumnblue-2 text-white" : "bg-bumngray-3 text-bumngray-6 cursor-not-allowed"
                }`}
              >
                {meta.available ? (dict as any).reservation?.roomlist?.ctaLabel ?? "View & Book" : (dict as any).reservation?.roomlist?.ctaUnavailable ?? "Unavailable"}
              </Link>
            </div>
          </div>

          {isDetailed && (room as any).location && (
            <div className="bg-white border border-bumngray-8 rounded-xl p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-bumnblue-2 mb-2">{(room as any).location.title ?? "Location"}</h4>
              <p className="text-sm text-bumngray-6">{(room as any).location.address}</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
