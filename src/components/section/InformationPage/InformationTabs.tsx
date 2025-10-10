import Link from "next/link";

export default function InformationTabs({ locale }: { locale: string }) {
  return (
    <div className="w-full mt-6 p-1 rounded-lg inline-flex flex-col items-center justify-center lg:flex-row bg-bumn-gradient-white-2 font-sans">
      <Link
        href={`/${locale}/information`}
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] text-base font-normal transition-all rounded-md whitespace-normal text-center"
      >
        News
      </Link>
      <Link
        href={`/${locale}/information/annual-report`}
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] text-base font-normal transition-all rounded-md whitespace-normal text-center shadow bg-bumn-gradient-primary-11 text-white"
      >
        Annual Report
      </Link>
      <Link
        href={`/${locale}/information/monthly-report?year=2024`}
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] text-base font-normal transition-all rounded-md whitespace-normal text-center"
      >
        Monthly Report
      </Link>
      <Link
        href={`/${locale}/information/press-release`}
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] text-base font-normal transition-all rounded-md whitespace-normal text-center"
      >
        Press Release
      </Link>
      <Link
        href={`/${locale}/information/secure-magazine`}
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] text-base font-normal transition-all rounded-md whitespace-normal text-center"
      >
        Secure
      </Link>
    </div>
  );
}
