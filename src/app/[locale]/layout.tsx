import type { ReactNode } from "react";
import Header from "@/components/general/Header/Header";
import Footer from "@/components/general/Footer/Footer";
import Whatsapp from "@/components/general/Whatsapp/Whatsapp";
import Background from "@/components/general/Background/Background";
import { getDictionary, type Locale } from "@/i18n/get_dictionary";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="md:hidden flex min-h-screen flex-col">
        <Header dict={dict} locale={typedLocale} />
        <div className="flex-grow">{children}</div>
        <Whatsapp />
        <Footer dict={dict} locale={typedLocale} />
      </div>

      <div className="hidden md:block">
        <Background>
          <Header dict={dict} locale={typedLocale} />
          <div className="flex-grow">{children}</div>
          <Whatsapp />
          <Footer dict={dict} locale={typedLocale} />
        </Background>
      </div>
    </div>
  );
}