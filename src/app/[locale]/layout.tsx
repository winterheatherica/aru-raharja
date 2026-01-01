import Header from "@/components/general/Header/Header";
import Footer from "@/components/general/Footer/Footer";
import Whatsapp from "@/components/general/Whatsapp/Whatsapp";
import Background from "@/components/general/Background/Background";
import { getDictionary, type Locale } from "@/i18n/get_dictionary";

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
      <Background>
        <Header dict={dict} locale={params.locale} />
          <div className="flex-grow">{children}</div>
        <Whatsapp />
        <Footer dict={dict} locale={params.locale} />
      </Background>
    </div>
  );
}
