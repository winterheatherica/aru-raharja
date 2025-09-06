import Navbar from "@/components/general/Navbar/Navbar";
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
      <Navbar dict={dict} locale={params.locale} />
        <main className="flex-grow">{children}</main>
      <Footer dict={dict} locale={params.locale} />
    </div>
  );
}
