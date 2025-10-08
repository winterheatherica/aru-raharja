"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  dict?: any;
};

export default function Culture({ dict }: Props) {
  const t = dict?.about?.culture;

  return (
    <section className="mt-8 lg:mt-14">
      <div className="space-y-8 font-semibold font-lato">
        <h3 className="mb-6 text-2xl font-bold font-helvetica text-bumngreen-1">
          {t?.title ?? "Company Culture"}
        </h3>

        <Link
          href="https://www.bumn.go.id/profil/erabarukami/nilai-organisasi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative h-[156px] sm:h-[381px] lg:h-[481px]">
            <Image
              src="/images/about/akhlak.png"
              alt="Nilai AKHLAK"
              fill
              className="object-contain w-full"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
