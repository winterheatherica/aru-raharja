import Link from "next/link";
import Image from "next/image";

export default function ReadMore({ dict, locale, currentSlug }: any) {
  const list = (dict as any)?.article?.list ?? [];
  const items = list.filter((a: any) => a.slug !== currentSlug).slice(0, 3);
  if (!items.length) return null;

  return (
    <div className="readmore-posts mb-8">
      <h3 className="readmore-title text-xl font-semibold mb-4">{locale === "id" ? "Baca Juga" : "Read More Posts"}</h3>
      <div className="readmore-container grid gap-4">
        {items.map((r: any) => (
          <Link key={r.slug} href={`/${locale}/article/${r.slug}`} className="readmore-item block p-3 border rounded-lg gap-4 items-start">
            <div className="readmore-thumb w-28 h-20 overflow-hidden rounded">
              {r.image_src ? <Image src={r.image_src} alt={r.title} width={160} height={110} className="object-cover" /> : null}
            </div>
            <h4 className="text-sm font-medium">{r.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
