import Image from "next/image";
import type { Dictionary } from "@/i18n/get_dictionary";

function CompanyLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[140px] h-[130px]">
        <Image
          src="/images/general/logo/aru.svg"
          alt="Aru Raharja Logo"
          width={140}
          height={130}
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function AboutBlock({ dict }: { dict: Dictionary }) {
  const desc = dict.footer.about.description;

  return (
    <div className="space-y-6">
      <CompanyLogo />
      <p className="font-normal text-[17px] leading-relaxed whitespace-pre-line">
        {desc}
      </p>
    </div>
  );
}
