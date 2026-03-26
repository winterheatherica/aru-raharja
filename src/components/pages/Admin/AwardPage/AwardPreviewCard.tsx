type Props = {
  imageSrc?: string;
  alt?: string;
  title?: string;
  year?: number | null;
  ctaText?: string;
  emptyText?: string;
};

export default function AwardPreviewCard({ imageSrc, alt, title, year, ctaText, emptyText }: Props) {
  return (
    <div className="relative p-4 overflow-hidden rounded-xl border border-bumnslate-10 bg-bumn-gradient-white-4 flex flex-col h-full max-w-xs">
      <div className="absolute inset-0 pointer-events-none bg-white/10 card-blur" />

      <div className="relative flex flex-col h-full">
        <div className="relative aspect-[4/3] mb-4 rounded-lg border border-bumnslate-10 bg-white overflow-hidden">
          {imageSrc ? (
            <img src={imageSrc} alt={alt || "award"} className="h-full w-full object-contain" />
          ) : (
            <div className="grid h-full place-items-center text-xs text-bumnslate-4">{emptyText ?? "No image"}</div>
          )}
        </div>

        <div className="text-center flex flex-col flex-1">
          <div className="min-h-[3.5rem] flex items-center justify-center text-sm font-semibold text-bumnslate-6">{title || "-"}</div>
          <div className="h-6 flex items-center justify-center text-xs text-bumnslate-4 pb-2">{year ?? "-"}</div>

          <button type="button" className="mt-auto inline-flex items-center justify-center gap-2 whitespace-nowrap bg-bumn-gradient-primary-11 text-white shadow-bumn-2 w-full h-8 px-6 py-3 text-xs font-semibold rounded-xl transition hover:opacity-95 lg:h-10 lg:text-sm">
            {ctaText ?? "Sertifikat Penghargaan"}
          </button>
        </div>
      </div>
    </div>
  );
}
