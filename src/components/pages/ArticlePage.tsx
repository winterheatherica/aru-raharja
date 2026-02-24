import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PageTopBanner from "@/components/section/ArticlePage/PageTopBanner/PageTopBanner";
import ArticleHero from "@/components/section/ArticlePage/ArticleHero/ArticleHero";
import AuthorHuman from "@/components/section/ArticlePage/AuthorHuman/AuthorHuman";
import PostBody from "@/components/section/ArticlePage/PostBody/PostBody";

type ArticleCategory = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
};

type Article = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  categories?: ArticleCategory[];
  created_at?: string;
  published_by?: string;
  published_by_avatar_url?: string;
  image_url?: string;
  content?: string;
  excerpt?: string;
};

type Props = {
  dict: Dictionary;
  locale: Locale;
  article?: Article;
};

export default function ArticlePage({ locale, article }: Props) {
  if (!article) {
    return (
      <main className="relative px-4 py-10 mx-auto max-w-screen-1440 text-bumnslate-6">
        <p className="text-sm">
          {locale === "id" ? "Artikel tidak ditemukan." : "Article not found."}
        </p>
      </main>
    );
  }

  const categoryChips =
    article.categories?.filter((c) => c?.name?.trim()) ??
    (article.category
      ? [
          {
            name: article.category,
          },
        ]
      : []);

  return (
    <main className="relative text-bumnslate-6 overflow-hidden">
      <PageTopBanner />

      <div className="relative z-10 px-4 pt-8 pb-16 mx-auto max-w-screen-1440">
        <div className="mx-auto w-full max-w-5xl bg-white p-8 lg:p-10 rounded-2xl shadow-bumn-2">
          <h1 className="mb-6 text-3xl lg:text-4xl font-extrabold text-bumnblue-2 leading-tight">
            {article.title ?? article.slug ?? "Article"}
          </h1>

          <AuthorHuman article={article} />

          {categoryChips.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {categoryChips.map((cat, idx) => (
                <span
                  key={`${cat.id ?? cat.slug ?? cat.name}-${idx}`}
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-bumncyan-1 text-bumnblue-2"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <ArticleHero article={article} />
          <PostBody article={article} />
        </div>
      </div>
    </main>
  );
}



