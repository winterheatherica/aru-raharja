"use client";

import Image from "next/image";

export default function ArticleHero({ article, titleOverride }: any) {
  if (!article) return null;

  const title = titleOverride ?? article.title ?? (article.slug ?? "Article");
  const img = article.image_src ?? null;

  return (
    <header className="mb-6">
      {img && (
        <div className="mb-6 rounded-2xl overflow-hidden shadow-bumn-2">
          <Image src={img} alt={title} width={1200} height={630} className="w-full h-auto object-cover" priority />
        </div>
      )}

      <div className="classic-title mb-2">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-bumnblue-2 leading-tight">{title}</h1>
      </div>

      {article.excerpt && <p className="text-lg text-bumnslate-6 mb-4">{article.excerpt}</p>}
    </header>
  );
}
