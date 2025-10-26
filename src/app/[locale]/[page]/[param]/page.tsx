import { notFound } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";

const BRAND = "PT Aru Raharja" as const;

type Params = {
  locale: Locale;
  page: string;
  param: string;
};

export default async function PageWithParam({ params }: { params: Params }) {
  const { locale, page, param } = params;
  const dict: Dictionary = await getDictionary(locale);
  const localeMap = (dynamicSegmentByLocale as any)[locale] ?? (dynamicSegmentByLocale as any)["id"];
  const articleBase = localeMap?.article;
  const roomBase = localeMap?.room;
  if (page === articleBase) {
    return <ArticlePage dict={dict} locale={locale} slug={param} />;
  }

  if (page === roomBase) {
    return <RoomPage dict={dict} locale={locale} id={param} />;
  }

  return notFound();
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, page, param } = params;
  const dict: Dictionary = await getDictionary(locale);

  const localeMap = (dynamicSegmentByLocale as any)[locale] ?? (dynamicSegmentByLocale as any)["id"];
  const articleBase = localeMap?.article;
  const roomBase = localeMap?.room;

  if (page === articleBase) {
    const list = (dict as any)?.article?.list ?? [];
    const found = list.find((a: any) => a.slug === param);
    if (found) {
      return {
        title: `${found.title ?? "Article"} - ${BRAND}`,
        description: found.excerpt ?? undefined,
      };
    }
    return {};
  }

  if (page === roomBase) {
    const detailed = (dict as any)?.room;
    if (detailed?.meta?.id === param) {
      const title = detailed.meta?.title ?? `Room ${param}`;
      const desc = detailed.meta?.subtitle ?? undefined;
      return { title: `${title} - ${BRAND}`, description: desc };
    }

    const listRooms: any[] = (dict as any)?.reservation?.roomlist?.list ?? [];
    const found = listRooms.find((r) => String(r.id) === String(param));
    if (found) {
      const title = found.title ?? `Room ${param}`;
      return { title: `${title} - ${BRAND}`, description: found.subtitle ?? undefined };
    }

    return {};
  }

  return {};
}

export async function generateStaticParams() {
  return [];
}
