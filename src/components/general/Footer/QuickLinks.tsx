import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

export default function QuickLinks({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer.quickLinks;

  return (
    <div className="space-y-6 lg:justify-self-center">
      <Link href={`/${locale}/faq`} className="flex items-center gap-2 text-lg font-semibold">
        <span className="relative w-[20px] h-[20px]">
          <Image src="/images/general/footer/faq.webp" alt="FAQ" fill className="object-contain" />
        </span>
        <h5 className="text-lg font-semibold">{t.faq}</h5>
      </Link>

      <ul className="space-y-5 font-normal text-[17px]">
        <li>
          <Link href={`/${locale}/contact`} className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/images/general/footer/contact.webp" alt="Contact" fill className="object-contain" />
            </span>
            <span>{t.contactUs}</span>
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/service`} className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/images/general/footer/e-procurement.webp" alt="E-procurement" fill className="object-contain" />
            </span>
            <span>{t.eProcurement}</span>
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/service`} className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/images/general/footer/faq.webp" alt="WBS" fill className="object-contain" />
            </span>
            <span>{t.wbs}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
