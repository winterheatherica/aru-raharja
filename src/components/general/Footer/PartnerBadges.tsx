import Image from "next/image";
import Link from "next/link";

export default function PartnerBadges() {
  return (
    <div className="w-full">
      <div className="flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-6">
        <Link
          href="https://www.danantaraindonesia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[170px] h-[62px]"
        >
          <Image
            src="/common/danantara.webp"
            alt="Danantara"
            fill
            className="object-contain"
          />
        </Link>

        <Link
          href="https://www.ojk.go.id/id/Default.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[190px] h-[72px]"
        >
          <Image
            src="/footer/ojk-logo-h.webp"
            alt="OJK"
            fill
            className="object-contain"
          />
        </Link>

        <Link
          href="https://www.ifg.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[190px] h-[72px]"
        >
          <Image
            src="/footer/ifg-logo-h.webp"
            alt="IFG"
            fill
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
