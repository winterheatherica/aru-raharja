import { getEmploymentLabel } from "@/components/section/CareerPage/Registration/type";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict?: Dictionary;
  title?: string;
  employment?: string;
  location?: string;
  description?: string;
  ctaText?: string;
};

export default function CareerVacancyPreviewCard({ dict, title, employment, location, description, ctaText }: Props) {
  return (
    <article className="h-full min-h-[300px] p-5 rounded-2xl bg-bumn-gradient-white-4 border border-bumnslate-10 shadow-bumn-2 text-bumnslate-6 flex flex-col">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-bumnblue-8 line-clamp-2 min-h-[3.5rem]">{title || "-"}</h3>

        <p className="text-sm text-bumnslate-8 mb-2 line-clamp-1">
          {getEmploymentLabel((employment as any) || "FULL_TIME", dict as any)} • {location || "-"}
        </p>

        <p className="text-base text-bumnslate-6 mb-4 line-clamp-4 min-h-[6rem]">{description || "-"}</p>
      </div>

      <button
        type="button"
        className="mt-auto inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white font-semibold shadow-bumn-2 transition hover:opacity-95"
      >
        {ctaText || "Kirim Lamaran"}
      </button>
    </article>
  );
}
