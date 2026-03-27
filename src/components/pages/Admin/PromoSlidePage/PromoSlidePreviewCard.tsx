type Props = {
  imageSrc?: string;
  alt?: string;
  emptyText?: string;
  ratio?: "16:9" | "1:1" | "9:16";
};

export default function PromoSlidePreviewCard({ imageSrc, alt, emptyText, ratio = "16:9" }: Props) {
  const ratioClass = ratio === "1:1" ? "aspect-square" : ratio === "9:16" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className="rounded-2xl bg-bumn-gradient-white-4 p-2">
      <div className={`relative w-full overflow-hidden rounded-xl bg-white ${ratioClass}`}>
        {imageSrc ? (
          <img src={imageSrc} alt={alt || "promo-slide"} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-bumnslate-4">{emptyText ?? "No image"}</div>
        )}
      </div>
    </div>
  );
}
