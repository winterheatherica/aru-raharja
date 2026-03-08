import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import Gallery from "@/components/section/ServicePage/Solutions/Content/Template/Gallery/Gallery";
import RoomDetail from "@/components/section/RoomPage/RoomDetail/RoomDetail";
import BackNavigation from "@/components/section/RoomPage/BackNavigation/BackNavigation";
import RoomCta from "@/components/section/RoomPage/RoomCta/RoomCta";
import type { Room } from "@/components/section/RoomPage/types";

type Props = {
  dict: Dictionary;
  locale: Locale;
  room?: Room;
};

export default function RoomPage({ dict, locale, room }: Props) {
  if (!room) {
    return (
      <main className="relative mx-auto max-w-screen-1440 px-4 py-10 text-bumnslate-6">
        <p className="text-sm">{locale === "id" ? "Ruangan tidak ditemukan." : "Room not found."}</p>
      </main>
    );
  }

  const t = (dict as any)?.room?.detail;
  const backLabel = t?.backButton ?? (locale === "id" ? "Kembali" : "Back");
  const ctaLabel = t?.cta ?? (locale === "id" ? "Pesan Sekarang" : "Book Now");
  const fallbackPath = locale === "id" ? `/${locale}/reservasi` : `/${locale}/reservation`;

  const galleryItems = room.images.map((img, i) => ({
    id: `${room.id}-${i}`,
    src: img.url,
  }));

  return (
    <main className="relative text-bumnslate-6">
      <div className="mx-auto max-w-screen-1440 px-4 py-2 lg:px-2">
        <article className="mx-auto mt-8 w-[90%] space-y-12 lg:mt-12">
          <div className="flex items-center justify-between px-0 sm:px-3 lg:px-5">
            <BackNavigation href={fallbackPath} label={backLabel} />
            <RoomCta label={ctaLabel} />
          </div>
          {galleryItems.length > 0 && <Gallery items={galleryItems} />}
          <RoomDetail title={room.title} description={room.description} capacity={room.capacity} floor={room.floor} facilities={room.facilities} />
        </article>
      </div>
    </main>
  );
}
