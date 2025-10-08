import type { Locale } from "@/i18n/getDictionary";
import { getDictionary } from "@/i18n/getDictionary";
import LoginPage from "@/components/pages/LoginPage";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return <LoginPage dict={dict} locale={locale} />;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return {
    title: locale === "id" ? "Masuk" : "Login",
    alternates: { languages: { en: "/en/login", id: "/id/login" } },
  };
}
