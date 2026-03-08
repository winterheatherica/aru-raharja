"use client";

import { useRouter } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import Gallery from "@/components/section/ServicePage/Solutions/Content/Template/Gallery/Gallery";
import RoomDetail from "@/components/section/RoomPage/RoomDetail/RoomDetail";

type Room = {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: {
    url: string;
    alt?: string;
    title?: string;
  }[];
  capacity: number;
  floor: number;
  facilities: string[];
};

type Props = {
  dict: Dictionary;
  locale: Locale;
  room?: Room;
};

export default function RoomPage({ dict, locale, room }: Props) {
  const router = useRouter();
  if (!room) {
    return (
      <main className="relative px-4 py-10 mx-auto max-w-screen-1440 text-bumnslate-6">
        <p className="text-sm">
          {locale === "id"
            ? "Ruangan tidak ditemukan."
            : "Room not found."}
        </p>
      </main>
    );
  }

  const t = (dict as any)?.room?.detail;
  const backLabel = t?.backButton ?? (locale === "id" ? "Kembali" : "Back");
  const ctaLabel = t?.cta ?? (locale === "id" ? "Pesan Sekarang" : "Book Now");
  const fallbackPath = locale === "id" ? `/${locale}/reservasi` : `/${locale}/reservation`;
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };

  const galleryItems = room.images.map((img, i) => ({
    id: `${room.id}-${i}`,
    src: img.url,
  }));

  return (
    <main className="relative text-bumnslate-6">
      <div className="px-4 lg:px-2 py-2 mx-auto max-w-screen-1440">
        <div className="w-[90%] mx-auto mt-8 lg:mt-12 space-y-12">
          <div className="flex items-center justify-between px-0 sm:px-3 lg:px-5">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 hover:opacity-95 transition"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="w-4 h-4"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor"
                />
              </svg>

              <span>{backLabel}</span>
            </button>
            <a
              href="https://wa.me/6281227008100"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 hover:opacity-95 transition"
            >
              {ctaLabel}
            </a>
          </div>

          {galleryItems.length > 0 && <Gallery items={galleryItems} />}

          <RoomDetail
            title={room.title}
            description={room.description}
            capacity={room.capacity}
            floor={room.floor}
            facilities={room.facilities}
          />
        </div>
      </div>
    </main>
  );
}
