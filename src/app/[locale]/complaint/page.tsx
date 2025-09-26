import { getDictionary, type Locale } from "@/i18n/getDictionary";
import Image from "next/image";
import EnhancedRoomReservation from "@/components/section/ReservePage/RoomReservation";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative p-16 mx-auto max-w-screen-1440">
      <EnhancedRoomReservation/>
    </main>
  );
}
