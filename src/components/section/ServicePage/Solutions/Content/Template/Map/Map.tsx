"use client";

import { ARU_LOCATION } from "./map.config";
import { ARU_MAP_IMAGE_URL } from "./map.constants";

export default function Map() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h3 className="text-2xl font-semibold text-bumnblue-1">
          Our Operational Location
        </h3>
        <p className="text-sm text-bumnslate-8">
          Our services are coordinated from a centralized operational hub to
          ensure consistency, governance, and service quality across all ARU
          business units.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-bumn-2">
        <img
          src={ARU_MAP_IMAGE_URL}
          alt={`${ARU_LOCATION.name} Map`}
          className="
            w-full
            aspect-[16/9]
            min-h-[320px]
            md:min-h-[420px]
            lg:min-h-[520px]
            object-cover
          "
          loading="lazy"
        />
      </div>

      <div className="max-w-4xl mx-auto bg-bumnwhite-1 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-4">
        <h4 className="text-sm font-semibold text-bumnblue-1">
          {ARU_LOCATION.name}
        </h4>

        <p className="text-sm text-bumnslate-8 leading-relaxed">
          This location functions as the central coordination hub for ARU’s
          operations. Strategic planning, cross-sector alignment, and
          operational oversight are managed from here to ensure every ARU
          service runs with clear standards and accountability.
        </p>

        <p className="text-sm text-bumnslate-8 leading-relaxed">
          By maintaining a single operational base, ARU is able to deliver
          consistent service quality while remaining agile and responsive to
          the evolving needs of clients across industries.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-sm font-medium text-bumnslate-6">
            {ARU_LOCATION.city}
          </p>

          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-bumncyan-1 text-bumnblue-2">
            Centralized Operations
          </span>
        </div>
      </div>
    </section>
  );
}
