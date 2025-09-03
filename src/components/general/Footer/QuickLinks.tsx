import Image from "next/image";
import Link from "next/link";

export default function QuickLinks() {
  return (
    <div className="space-y-6 lg:justify-self-center">
      <Link href="/faq" className="flex items-center gap-2 text-lg font-semibold">
        <span className="relative w-[20px] h-[20px]">
          <Image src="/footer/faq.webp" alt="FAQ" fill className="object-contain" />
        </span>
        <h5 className="text-lg font-semibold">FAQ</h5>
      </Link>

      <ul className="space-y-5 font-normal text-[17px]">
        <li>
          <Link href="/contact" className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/contact.webp" alt="Contact" fill className="object-contain" />
            </span>
            <span>Contact Us</span>
          </Link>
        </li>
        <li>
          <Link href="/service" className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/e-procurement.webp" alt="E-procurement" fill className="object-contain" />
            </span>
            <span>E - Procurement</span>
          </Link>
        </li>
        <li>
          <Link href="/service" className="flex items-center gap-2">
            <span className="relative w-[20px] h-[20px]">
              <Image src="/footer/faq.webp" alt="WBS" fill className="object-contain" />
            </span>
            <span>Whistle Blowing System (WBS)</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
