import Header from "@/components/general/Header/Header";
import Footer from "@/components/general/Footer/Footer";
import { getDictionary, type Locale } from "@/i18n/getDictionary";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header dict={dict} locale={params.locale} />
        <div className="flex-grow">{children}</div>
      <Footer dict={dict} locale={params.locale} />
    </div>
  );
}
