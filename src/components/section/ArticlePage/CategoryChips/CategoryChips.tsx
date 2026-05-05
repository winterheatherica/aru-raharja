"use client";

import * as React from "react";
import type { ArticleCategory } from "@/components/section/ArticlePage/types";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  categories: ArticleCategory[];
};

export default function CategoryChips({ categories }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  if (!categories.length) return null;

  const anim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div
      ref={ref}
      className={`mb-8 flex flex-wrap gap-3 transition-all duration-[800ms] ease-out ${anim}`}
    >
      {categories.map((cat, idx) => (
        <span
          key={`${cat.id ?? cat.slug ?? cat.name}-${idx}`}
          className="inline-block rounded-full bg-bumncyan-1 px-3 py-1 text-xs font-medium text-bumnblue-2"
        >
          {cat.name}
        </span>
      ))}
    </div>
  );
}