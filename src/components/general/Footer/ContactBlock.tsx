import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ContactBlock({ dict }: { dict: Dictionary }) {
  const t = dict.footer.contact;

  return (
    <div className="space-y-6 lg:justify-self-center">
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="relative w-[20px] h-[20px]">
            <Image src="/footer/building.webp" alt="building" fill className="object-contain" />
          </span>
          <h5 className="text-lg font-semibold">{t.headOffice}</h5>
        </div>

        <div className="ms-[28px] text-[17px] font-normal leading-relaxed whitespace-pre-line">
          {t.address}
        </div>

        <div>
          <Link href="mailto:info@aruraharja.co.id" className="flex items-center gap-2 underline text-[17px]">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/mail.webp" alt="mail" fill className="object-contain" />
            </span>
            <span>info@aruraharja.co.id</span>
          </Link>
        </div>

        <div className="space-y-2 text-[17px]">
          <div className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/whatsapp.webp" alt="whatsapp" fill className="object-contain" />
            </span>
            <span>021 7818 124</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/comment.webp" alt="comment" fill className="object-contain" />
            </span>
            <span>021 7884 5104</span>
          </div>
        </div>
      </div>
    </div>
  );
}

