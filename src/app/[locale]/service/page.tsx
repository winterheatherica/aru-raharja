import { getDictionary, type Locale } from "@/i18n/getDictionary";
import Image from "next/image";
import ServicesTabs from "@/components/section/ServicesPage/ServicesTabs";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative px-12 py-2 mx-auto max-w-screen-1440">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-300 to-blue-700 rounded-3xl w-full min-h-40 md:min-h-60 lg:min-h-80">
          <div className="relative text-white z-[2] p-12 w-full max-w-[40rem]">
            <h1 className="text-5xl font-bold">Layanan Kami</h1>
            <p className="text-lg mt-6">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
          </div>
          <div className="absolute rounded-3xl z-[1] min-h-40 md:w-[300px] lg:w-[360px] md:h-60 lg:h-80 justify-self-end bottom-0 left-[50rem]">
            <Image
                src="/services/service-bg.png"
                alt="Layanan/Complaint"
                fill
                className="absolute z-0"
            />
          </div>
      </div>
      <p className="py-12 px-12 font-semibold">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
      </p>
      <div className="py-4 items-center text-center">
        <h3 className="text-2xl font-bold text-blue-500">Layanan</h3>
        <ServicesTabs/>
      </div>
    </main>
  );
}
