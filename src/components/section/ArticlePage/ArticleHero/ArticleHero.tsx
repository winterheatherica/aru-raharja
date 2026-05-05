"use client";

import * as React from "react";
import Image from "next/image";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

export default function ArticleHero({ article }: any) {
  if (!article) return null;

  const title = article.title ?? article.slug ?? "Article";
  const img = article.image_url ?? null;

  if (!img) return null;

  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div
      ref={ref}
      className={`mb-8 transition-all duration-[800ms] ease-out ${anim}`}
    >
      <div className="rounded-xl overflow-hidden border border-bumnslate-10 shadow-bumn-2">
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