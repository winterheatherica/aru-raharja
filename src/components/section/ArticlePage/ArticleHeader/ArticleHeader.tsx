"use client";

import * as React from "react";
import AuthorHuman from "@/components/section/ArticlePage/AuthorHuman/AuthorHuman";
import type { Article } from "@/components/section/ArticlePage/types";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  article: Article;
};

export default function ArticleHeader({ article }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-10";

  return (
    <header
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${anim}`}
    >
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-bumnblue-2 lg:text-4xl">
        {article.title ?? article.slug ?? "Article"}
      </h1>
      <AuthorHuman article={article} />
    </header>
  );
}