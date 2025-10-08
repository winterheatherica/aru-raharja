import EnhancedRoomReservation from "@/components/section/ReservePage/RoomReservation";
import type { Locale, Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function ReservationPage({ dict, locale }: Props) {
  return (
    <main className="relative p-4 lg:p-16 mx-auto max-w-screen-1440">
      <EnhancedRoomReservation />
    </main>
  );
}
