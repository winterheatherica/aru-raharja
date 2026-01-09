import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import Carousel from "@/components/section/RoomPage/Carousel/Carousel";

type Props = {
  dict: Dictionary;
  locale: Locale;
  id: string;
};

export default function RoomPage({ dict, locale, id }: Props) {
  return <Carousel />;
}
