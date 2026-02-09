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
  if (!room) {
    return (
      <main className="relative px-4 py-10 mx-auto max-w-screen-1440 text-bumnslate-6">
        <p className="text-sm">
          {locale === "id"
            ? "Kamar tidak ditemukan."
            : "Room not found."}
        </p>
      </main>
    );
  }

  const galleryItems = room.images.map((img, i) => ({
    id: `${room.id}-${i}`,
    src: img.url,
  }));

  return (
    <main className="relative text-bumnslate-6">
      <div className="px-4 lg:px-2 py-2 mx-auto max-w-screen-1440">
        <div className="w-[90%] mx-auto mt-8 lg:mt-12 space-y-12">
          {galleryItems.length > 0 && (
            <Gallery items={galleryItems} />
          )}

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
