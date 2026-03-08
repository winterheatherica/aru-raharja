import AuthorHuman from "@/components/section/ArticlePage/AuthorHuman/AuthorHuman";
import type { Article } from "@/components/section/ArticlePage/types";

type Props = {
  article: Article;
};

export default function ArticleHeader({ article }: Props) {
  return (
    <header>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-bumnblue-2 lg:text-4xl">
        {article.title ?? article.slug ?? "Article"}
      </h1>
      <AuthorHuman article={article} />
    </header>
  );
}
