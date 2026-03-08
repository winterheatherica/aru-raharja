import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PageTopBanner from "@/components/section/ArticlePage/PageTopBanner/PageTopBanner";
import ArticleHero from "@/components/section/ArticlePage/ArticleHero/ArticleHero";
import PostBody from "@/components/section/ArticlePage/PostBody/PostBody";
import BackNavigation from "@/components/section/ArticlePage/BackNavigation/BackNavigation";
import ArticleHeader from "@/components/section/ArticlePage/ArticleHeader/ArticleHeader";
import CategoryChips from "@/components/section/ArticlePage/CategoryChips/CategoryChips";
import type { Article } from "@/components/section/ArticlePage/types";

type Props = {
  dict: Dictionary;
  locale: Locale;
  article?: Article;
};

export default function ArticlePage({ dict, locale, article }: Props) {
  if (!article) {
    return (
      <main className="relative mx-auto max-w-screen-1440 px-4 py-10 text-bumnslate-6">
        <p className="text-sm">
          {locale === "id" ? "Artikel tidak ditemukan." : "Article not found."}
        </p>
      </main>
    );
  }

  const t = (dict as any)?.article?.detail;
  const backLabel = t?.backButton ?? (locale === "id" ? "Kembali" : "Back");
  const fallbackPath = locale === "id" ? `/${locale}/informasi` : `/${locale}/information`;
  const categoryChips =
    article.categories?.filter((c) => c?.name?.trim()) ??
    (article.category? [{ name: article.category }] : []);
    
  return (
    <main className="relative overflow-hidden text-bumnslate-6">
      <PageTopBanner />
      <div className="relative z-10 mx-auto max-w-screen-1440 px-4 pb-16 pt-8">
        <article className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-8 shadow-bumn-2 lg:p-10">
          <BackNavigation href={fallbackPath} label={backLabel} />
          <ArticleHeader article={article} />
          <CategoryChips categories={categoryChips} />
          <ArticleHero article={article} />
          <PostBody article={article} />
        </article>
      </div>
    </main>
  );
}
