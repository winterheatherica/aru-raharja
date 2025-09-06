import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

export default function BottomBar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  const t = dict.footer.bottom;

  return (
    <div
      className="
        w-full px-4 py-3 font-op
        relative
        lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-10
      "
    >
      <div className="flex flex-col items-center gap-4">
        <ul className="inline-flex items-center space-x-6 text-[15px]">
          <li>
            <Link href={`/${locale}/legal`} className="underline">
              {t.legalTerms}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/privacy`} className="underline">
              {t.privacyPolicy}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/accessibility`} className="underline">
              {t.accessibility}
            </Link>
          </li>
        </ul>
        <p className="text-[15px] font-semibold">
          © {year} – Aru Raharja. {t.rights}
        </p>
      </div>
    </div>
  );
}
