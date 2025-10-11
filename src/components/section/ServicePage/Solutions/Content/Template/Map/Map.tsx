"use client";

import * as React from "react";

export type MapMarker = {
  id: string;
  title: string;
  subtitle?: string;
  address?: string;
  category?: string;
  placeUrl?: string;
  xy?: { xPct: number; yPct: number };
};

type Props = {
  title?: string;
  description?: string;
  mode: "embed" | "image";
  embedUrl?: string;
  image?: { src: string; alt?: string; aspectRatio?: string };
  markers?: MapMarker[];
  categories?: string[];
  enableSearch?: boolean;
  enableCategoryFilter?: boolean;
  defaultActiveId?: string;
  className?: string;
  onMarkerClick?: (m: MapMarker) => void;
};

export default function Map({
  title,
  description,
  mode,
  embedUrl,
  image,
  markers = [],
  categories,
  enableSearch = true,
  enableCategoryFilter = true,
  defaultActiveId,
  className = "",
  onMarkerClick,
}: Props) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<string>("all");
  const [activeId, setActiveId] = React.useState<string | null>(defaultActiveId ?? null);

  const derivedCats = React.useMemo(() => {
    if (categories?.length) return categories;
    const s = new Set<string>();
    markers.forEach(m => m.category && s.add(m.category));
    return Array.from(s);
  }, [categories, markers]);

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return markers.filter(m => {
      const okCat = cat === "all" || !cat ? true : (m.category || "") === cat;
      const okText =
        !qq ||
        m.title.toLowerCase().includes(qq) ||
        (m.subtitle || "").toLowerCase().includes(qq) ||
        (m.address || "").toLowerCase().includes(qq);
      return okCat && okText;
    });
  }, [markers, q, cat]);

  const setActive = (id: string) => {
    setActiveId(id);
    const mm = markers.find(m => m.id === id);
    mm && onMarkerClick?.(mm);
  };

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="text-sm text-bumnslate-6">{description}</p>}
        </header>
      )}

      <div className="grid gap-4 md:grid-cols-[minmax(260px,360px)_1fr]">
        <aside className="rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2">
          <div className="flex flex-col gap-2">
            {enableSearch && (
              <div className="flex items-center overflow-hidden rounded-lg border border-bumnslate-10 bg-white">
                <span className="pl-3 pr-1 text-bumnslate-6">
                  <SearchIcon className="h-4 w-4" />
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari lokasi / alamat…"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                />
              </div>
            )}

            {enableCategoryFilter && derivedCats.length > 0 && (
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
              >
                <option value="all">Semua kategori</option>
                {derivedCats.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>

          <div className="mt-3 max-h-[380px] space-y-2 overflow-auto pr-1">
            {filtered.map((m) => {
              const active = m.id === activeId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    active
                      ? "border-bumnblue-5 bg-bumn-gradient-primary-10 text-white"
                      : "border-bumnslate-10 bg-white hover:border-bumnblue-5"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <PinIcon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-white" : "text-bumnblue-2"}`} />
                    <div>
                      <div className={`text-sm font-semibold ${active ? "text-white" : "text-bumnblue-2"}`}>
                        {m.title}
                      </div>
                      {m.subtitle && (
                        <div className={`text-xs ${active ? "text-white/90" : "text-bumnslate-6"}`}>
                          {m.subtitle}
                        </div>
                      )}
                      {m.address && (
                        <div className={`mt-1 text-xs ${active ? "text-white/80" : "text-bumnslate-6"}`}>
                          {m.address}
                        </div>
                      )}
                      {m.category && (
                        <div className="mt-2">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                            active ? "bg-white/15 text-white" : "bg-bumnwhite-3 text-bumnslate-6"
                          }`}>
                            {m.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-bumnslate-10 p-3 text-center text-sm text-bumnslate-6">
                Tidak ada lokasi yang cocok.
              </div>
            )}
          </div>
        </aside>

        <div className="rounded-2xl border border-bumnslate-10 bg-white shadow-bumn-2">
          {mode === "embed" ? (
            embedUrl ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <iframe
                  title="Map"
                  src={embedUrl}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <EmptyState text="Pasang embedUrl untuk menampilkan peta." />
            )
          ) : image?.src ? (
            <ImageMap image={image} markers={filtered} activeId={activeId} setActive={setActive} />
          ) : (
            <EmptyState text="Pasang image.src untuk menampilkan peta gambar." />
          )}
        </div>
      </div>
    </section>
  );
}

function ImageMap({
  image,
  markers,
  activeId,
  setActive,
}: {
  image: { src: string; alt?: string; aspectRatio?: string };
  markers: MapMarker[];
  activeId: string | null;
  setActive: (id: string) => void;
}) {
  const ratio = image.aspectRatio || "aspect-[16/9]";

  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded-2xl`}>
      <img src={image.src} alt={image.alt || "Map"} className="absolute inset-0 h-full w-full object-cover" />

      {markers.map((m) => {
        if (!m.xy) return null;
        const active = m.id === activeId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setActive(m.id)}
            style={{ left: `${m.xy.xPct}%`, top: `${m.xy.yPct}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-full focus:outline-none"
            aria-label={`Pin ${m.title}`}
          >
            <span
              className={`flex items-center justify-center rounded-full p-2 shadow-bumn-2 ${
                active ? "bg-bumn-gradient-primary-10 text-white" : "bg-white text-bumnblue-2"
              } ring-2 ${active ? "ring-bumnblue-5" : "ring-bumnslate-10"}`}
            >
              <PinIcon className="h-4 w-4" />
            </span>

            <div
              className={`mt-2 w-56 rounded-xl border p-3 text-left ${
                active ? "border-bumnblue-5 bg-white" : "border-bumnslate-10 bg-white"
              }`}
            >
              <div className="text-sm font-semibold text-bumnblue-2">{m.title}</div>
              {m.subtitle && <div className="text-xs text-bumnslate-6">{m.subtitle}</div>}
              {m.address && <div className="mt-1 text-xs text-bumnslate-6">{m.address}</div>}
              {m.placeUrl && (
                <a
                  href={m.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-bumnblue-2 underline underline-offset-2"
                >
                  Buka di Maps <ExternalIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-bumnwhite-3 text-sm text-bumnslate-6">
      {text}
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path d="M12 22s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" stroke="currentColor" strokeWidth={1.7} />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth={1.7} />
    </svg>
  );
}
function ExternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props} aria-hidden>
      <path d="M11 4h5v5M9 11l7-7M15 11v5H5V5h5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}
