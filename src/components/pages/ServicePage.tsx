import Image from "next/image";
import ServicesTabs from "@/components/section/ServicesPage/ServicesTabs";
import type { Locale, Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function ServicePage({ dict, locale }: Props) {
  return (
    <main className="relative px-12 py-2 mx-auto max-w-screen-1440">
      <section
        className="relative flex overflow-hidden text-white rounded-2xl h-auto lg:h-[352px] 
                   animate-fade-down bg-bumn-gradient-primary-12"
      >
        <div className="absolute inset-y-0 left-0 w-full flex items-center justify-start pointer-events-none z-0">
          <Image
            src="/images/general/masking/masking-variant-3.png"
            alt="Masking background"
            fill
            className="object-cover object-left invert brightness-0"
            priority
          />
        </div>

        <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end pointer-events-none z-10">
          <Image
            src="/images/services/service-bg.png"
            alt="Services background"
            width={420}
            height={200}
            className="object-contain object-right"
            priority
          />
        </div>

        <div className="relative z-20 flex w-full py-8 pl-8 pr-8 md:w-6/12 lg:pr-0 lg:pl-24 lg:py-14">
          <div className="max-w-[627px]">
            <h1 className="text-2xl lg:text-5xl lg:leading-[58px] font-bold font-inter animate-fade-right animate-delay-300">
              {locale === "id" ? "Layanan Kami" : "Our Services"}
            </h1>
            <div className="mt-4 text-lg lg:mt-6 font-lato animate-fade-left animate-delay-[600ms]">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
                pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
                tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="py-12 px-12 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
        faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
        pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
        tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
      </p>

      <div className="py-4 items-center text-center">
        <h3 className="text-2xl font-bold text-blue-500">
          {locale === "id" ? "Layanan" : "Services"}
        </h3>
        <ServicesTabs />
      </div>
    </main>
  );
}
