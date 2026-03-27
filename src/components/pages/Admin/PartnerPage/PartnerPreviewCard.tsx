type Props = {
  imageSrc?: string;
  alt?: string;
  emptyText?: string;
};

export default function PartnerPreviewCard({ imageSrc, alt, emptyText }: Props) {
  return (
    <div className="rounded-2xl bg-bumn-gradient-white-4 p-2">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-white">
        {imageSrc ? (
          <img src={imageSrc} alt={alt || "partner"} className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-bumnslate-4">{emptyText ?? "No image"}</div>
        )}
      </div>
    </div>
  );
}
