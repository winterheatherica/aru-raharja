"use client";
import Image from "next/image";

export default function ArticleHero({ article }: any) {
  if (!article) return null;

  const title = article.title ?? article.slug ?? "Article";
  const img = article.image_url ?? null;

  if (!img) return null;

  return (
    <div className="mb-8">
      <div className="rounded-xl overflow-hidden border border-bumngray-8 shadow-bumn-2">
        <Image
          src={img}
          alt={title}
          width={1200}
          height={630}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  );
}
