import Image from "next/image";
import Link from "next/link";

export default function PartnerBadges() {
  return (
    <div className="w-full">
      <div className="flex flex-row lg:flex-col items-center justify-center gap-6">
        <Link
          href="https://www.danantaraindonesia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[170px] h-[62px]"
        >
          <Image
            src="/images/general/logo/danantara.webp"
            alt="Danantara"
            fill
            className="object-contain"
          />
        </Link>

        <Link
          href="https://www.ojk.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[190px] h-[72px]"
        >
          <Image
            src="/images/general/footer/ojk-logo-h.webp"
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
            src="/images/general/footer/ifg-logo-h.webp"
            alt="IFG"
            fill
            className="object-contain"
          />
        </Link>

        <Link
          href="https://dapenjr.co.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[170px] h-[62px]"
        >
          <Image
            src="/images/general/logo/dpjr.webp"
            alt="Danantara"
            fill
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
