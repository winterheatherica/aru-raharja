"use client";

import * as React from "react";

import Pricing from "@/components/section/ServicePage/Solutions/Content/Template/Pricing/Pricing";
import Gallery from "@/components/section/ServicePage/Solutions/Content/Template/Gallery/Gallery";
import Booking, { type BookingAvailability } from "@/components/section/ServicePage/Solutions/Content/Template/Booking/Booking";
import Map from "@/components/section/ServicePage/Solutions/Content/Template/Map/Map";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";

type Props = {
  dict: any;
  locale: string;
};

export default function Aruspace({ dict }: Props) {
  const copy = dict?.service?.solutions?.aruspace;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>space</i> — Working space fleksibel & strategis";
  const description =
    copy?.description ??
    "Sediakan Virtual Office, Dedicated Desk, Meeting Room, dan Event Space dengan fasilitas lengkap di lokasi strategis.";
const pricingData = {
  tiers: [
    {
      id: "vo",
      name: "Virtual Office",
      description: "Alamat bisnis & resepsionis surat.",
      priceMonthly: 750000,
      priceYearly: 7500000,
      features: ["Alamat bisnis premium", "Surat domisili", "Resepsionis surat"],
      ctaLabel: "Pilih VO",
      ctaHref: "/contact?plan=vo",
    },
    {
      id: "desk",
      name: "Dedicated Desk",
      description: "Meja pribadi 24/7 dengan fasilitas lengkap.",
      priceMonthly: 1500000,
      priceYearly: 15000000,
      features: ["Meja pribadi", "24/7 access", "WiFi cepat", "Printer & pantry"],
      ctaLabel: "Pilih Desk",
      ctaHref: "/contact?plan=desk",
      popular: true,
    },
    {
      id: "meeting",
      name: "Meeting Room",
      description: "Sewa jam-jaman untuk rapat / presentasi.",
      priceMonthly: 200000,
      priceYearly: 2000000,
      features: ["Jam sewa fleksibel", "TV/Projector", "Kopi & snack opsional"],
      ctaLabel: "Booking Room",
      ctaHref: "/contact?plan=meeting",
    },
  ],
  note: "Harga sudah termasuk biaya layanan dasar. Pajak belum termasuk.",
};


  const floorImages = [
    {
      id: "fl1",
      kind: "image" as const,
      src: "/images/general/gedung-2.png",
      alt: "Floor Plan Lt.1",
      caption: "Lantai 1 — Lobby, VO, Meeting Room",
    },
    {
      id: "fl2",
      kind: "image" as const,
      src: "/images/general/gedung-2.png",
      alt: "Floor Plan Lt.2",
      caption: "Lantai 2 — Dedicated Desk, Event Space",
    },
  ];

  const availability: BookingAvailability = {
    "2025-10-10": [
      { id: "am", start: "09:00", end: "12:00", capacity: 2, booked: 1, label: "Morning" },
      { id: "pm", start: "13:00", end: "17:00", capacity: 2, booked: 0, label: "Afternoon" },
    ],
    "2025-10-11": [
      { id: "full", start: "09:00", end: "18:00", capacity: 1, booked: 0, label: "Full Day" },
    ],
  };

  const markers = [
    {
      id: "loc1",
      title: "ARUspace Sudirman",
      subtitle: "Jl. Sudirman Kav. 52-53, Jakarta",
      address: "SCBD, Jakarta",
      category: "Headquarter",
      xy: { xPct: 42, yPct: 50 },
      placeUrl: "https://maps.google.com?q=SCBD+Jakarta",
    },
  ];

  const amenities = [
    { id: "wifi", title: "High-speed WiFi" },
    { id: "coffee", title: "Coffee & Tea" },
    { id: "printer", title: "Printer & Scanner" },
    { id: "meeting", title: "Meeting Room" },
    { id: "event", title: "Event Space" },
    { id: "parking", title: "Parkir" },
    { id: "lounge", title: "Lounge Area" },
    { id: "support", title: "Admin Support" },
  ];

  return (
    <div className="space-y-10 pb-10">
      <section className="space-y-3">
        <h2
          className="text-2xl lg:text-4xl font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <p className="text-bumnslate-5 text-base lg:text-lg">{description}</p>
      </section>

      <Pricing
        tiers={pricingData.tiers}
        note={pricingData.note}
        billingToggle
        currency="IDR"
        defaultPeriod="monthly"
      />

      <Gallery
        title="Floor Plan Preview"
        description="Gambaran tata ruang: VO, Desk, Meeting Room, Event Space."
        items={floorImages}
        layout="grid"
        gridCols={{ base: 1, md: 2 }}
        showThumbnails
      />

      <div id="aruspace-booking">
        <Booking
          title="Booking Calendar"
          description="Pilih slot waktu untuk meeting room atau event space."
          timezone="WIB (UTC+7)"
          availability={availability}
          requireContact
          onSubmit={({ date, slotId, contact }) => {
            window.location.href =
              `/contact?topic=space-booking&date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slotId)}`;
          }}
        />
      </div>

      <Map
        title="Lokasi ARUspace"
        description="Strategis di pusat bisnis Jakarta."
        mode="image"
        image={{
          src: "/images/services/peta.jpg",
          alt: "Peta Jakarta",
          aspectRatio: "aspect-[1/1]",
        }}
        markers={markers}
        defaultActiveId="loc1"
      />

      <Cards
        variant="badges"
        title="Amenities"
        description="Fasilitas lengkap untuk kenyamanan kerja & acara."
        items={amenities}
      />

    </div>
  );
}
