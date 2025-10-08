import type { Locale } from "@/i18n/getDictionary";
import { getDictionary } from "@/i18n/getDictionary";
import AdminPage from "@/components/pages/AdminPage";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return <AdminPage dict={dict} locale={locale} />;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return {
    title: "Admin",
    alternates: { languages: { en: "/en/admin", id: "/id/admin" } },
  };
}
