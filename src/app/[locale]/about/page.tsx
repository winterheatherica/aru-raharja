import { getDictionary, type Locale } from "@/i18n/getDictionary";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative px-2 py-2 mx-auto max-w-screen-1440">
    </main>
  );
}
