"use client";
import Image from "next/image";

export default function ArticleHero({ article, titleOverride }: any) {
  if (!article) return null;

  const title = titleOverride ?? article.title ?? article.slug ?? "Article";
  const img = article.image_src ?? null;

  return (
    <div className="mb-8">
      {img && (
        <div className="mb-6 rounded-xl overflow-hidden border border-bumngray-8 shadow-bumn-2">
          <Image
            src={img}
            alt={title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
      <div className="mb-3">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-bumnblue-2 leading-tight">
          {title}
        </h1>
      </div>
      {article.excerpt && (
        <p className="text-base text-bumnslate-6 mb-4">{article.excerpt}</p>
      )}
    </div>
  );
}
