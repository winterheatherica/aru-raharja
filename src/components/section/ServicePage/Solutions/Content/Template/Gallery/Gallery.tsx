"use client";

import * as React from "react";

export type GalleryItem = {
  id: string;
  kind?: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
};

type Props = {
  title?: string;
  description?: string;
  items: GalleryItem[];
  layout?: "carousel" | "grid";
  gridCols?: { base?: number; md?: number; xl?: number };
  showThumbnails?: boolean;
  autoplay?: boolean;
  autoplayIntervalMs?: number;
  rounded?: "md" | "xl" | "2xl";
  className?: string;
};

export default function Gallery({
  title,
  description,
  items,
  layout = "carousel",
  gridCols = { base: 1, md: 2, xl: 3 },
  showThumbnails = true,
  autoplay = false,
  autoplayIntervalMs = 5000,
  rounded = "2xl",
  className = "",
}: Props) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const total = items.length;

  React.useEffect(() => {
    if (layout !== "carousel" || !autoplay || total <= 1) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, Math.max(2000, autoplayIntervalMs));
    return () => clearInterval(t);
  }, [layout, autoplay, autoplayIntervalMs, total]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  const roundedClass =
    rounded === "2xl" ? "rounded-2xl" : rounded === "xl" ? "rounded-xl" : "rounded-md";

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="text-sm text-bumnslate-6">{description}</p>}
        </header>
      )}

      {layout === "grid" ? (
        <Grid items={items} roundedClass={roundedClass} onOpen={(idx) => { setActive(idx); setOpen(true); }} gridCols={gridCols} />
      ) : (
        <Carousel
          items={items}
          active={active}
          setActive={setActive}
          openLightbox={() => setOpen(true)}
          showThumbnails={showThumbnails}
          roundedClass={roundedClass}
        />
      )}

      {open && total > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bumnblack-1/70 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 rounded-full bg-bumnslate-10/60 p-2 text-white hover:bg-bumnslate-10"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className={`overflow-hidden ${roundedClass} bg-black`}>
              <Media item={items[active]} className="mx-auto max-h-[80vh] w-full object-contain" controls />
            </div>

            {items[active]?.caption && (
              <div className="mt-2 text-center text-sm text-bumnwhite-1">
                {items[active].caption}
              </div>
            )}

            {total > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-xl bg-bumnblack-1/40 p-3 text-white hover:bg-bumnblack-1/60"
                  onClick={() => setActive((i) => (i - 1 + total) % total)}
                  aria-label="Sebelumnya"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-xl bg-bumnblack-1/40 p-3 text-white hover:bg-bumnblack-1/60"
                  onClick={() => setActive((i) => (i + 1) % total)}
                  aria-label="Berikutnya"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Carousel({
  items,
  active,
  setActive,
  openLightbox,
  showThumbnails,
  roundedClass,
}: {
  items: GalleryItem[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  openLightbox: () => void;
  showThumbnails: boolean;
  roundedClass: string;
}) {
  const total = items.length;
  if (total === 0) return null;

  return (
    <div className="w-full">
      <div className="relative">
        <div className={`overflow-hidden border border-bumnslate-10 bg-bumnblack-1/90 ${roundedClass} shadow-bumn-2`}>
          <button
            className="group relative block w-full"
            onClick={openLightbox}
            aria-label="Buka pratinjau besar"
          >
            <Media item={items[active]} className="w-full object-contain" heightClass="max-h-[460px]" />
            {items[active]?.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white opacity-95">
                {items[active].caption}
              </div>
            )}
          </button>
        </div>

        {total > 1 && (
          <>
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-bumnblack-1/50 p-2 text-white hover:bg-bumnblack-1/70"
                onClick={() => setActive((i: number) => (i - 1 + total) % total)}
                aria-label="Sebelumnya"
                >
                <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-bumnblack-1/50 p-2 text-white hover:bg-bumnblack-1/70"
                onClick={() => setActive((i: number) => (i + 1) % total)}
                aria-label="Berikutnya"
                >
                <ChevronRightIcon className="h-5 w-5" />
                </button>
          </>
        )}
      </div>

      {showThumbnails && total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {items.map((it, idx) => (
            <button
              key={it.id}
              onClick={() => setActive(idx)}
              className={`relative h-16 w-28 overflow-hidden rounded-lg border ${
                idx === active ? "border-bumnblue-5" : "border-bumnslate-10"
              }`}
              aria-label={`Pilih item ${idx + 1}`}
            >
              <Media item={it} className="h-full w-full object-cover" />
              {idx === active && (
                <span className="absolute inset-0 ring-1 ring-bumnblue-5" aria-hidden />
              )}
              {it.kind === "video" && (
                <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[10px] text-white">
                  Video
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Grid({
  items,
  roundedClass,
  onOpen,
  gridCols,
}: {
  items: GalleryItem[];
  roundedClass: string;
  onOpen: (idx: number) => void;
  gridCols: { base?: number; md?: number; xl?: number };
}) {
  const gridClass = `grid gap-3 ${
    gridCols.base ? `grid-cols-${gridCols.base}` : "grid-cols-1"
  } ${gridCols.md ? `md:grid-cols-${gridCols.md}` : ""} ${
    gridCols.xl ? `xl:grid-cols-${gridCols.xl}` : ""
  }`;

  if (items.length === 0) return null;

  return (
    <div className={gridClass}>
      {items.map((it, idx) => (
        <button
          key={it.id}
          onClick={() => onOpen(idx)}
          className={`group relative overflow-hidden border border-bumnslate-10 bg-bumnblack-1/80 ${roundedClass} focus:outline-none`}
          aria-label={`Buka ${it.kind === "video" ? "video" : "gambar"} ${idx + 1}`}
        >
          <Media item={it} className="h-44 w-full object-cover transition group-hover:opacity-90" />
          {it.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-xs text-white">
              {it.caption}
            </div>
          )}
          {it.kind === "video" && (
            <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
              Video
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function Media({
  item,
  className,
  heightClass,
  controls = false,
}: {
  item: GalleryItem;
  className?: string;
  heightClass?: string;
  controls?: boolean;
}) {
  const kind = item.kind || "image";
  if (kind === "video") {
    return (
      <video
        className={`${className || ""} ${heightClass || ""}`}
        src={item.src}
        poster={item.poster}
        controls={controls}
        preload="metadata"
      />
    );
  }
  return <img className={`${className || ""} ${heightClass || ""}`} src={item.src} alt={item.alt || ""} />;
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}
