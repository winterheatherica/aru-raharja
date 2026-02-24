import Link from "next/link";
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

export default function ArticlePage({ dict, locale, article }: Props) {
  if (!article) {
    return (
      <main className="relative px-4 py-10 mx-auto max-w-screen-1440 text-bumnslate-6">
        <p className="text-sm">
          {locale === "id" ? "Artikel tidak ditemukan." : "Article not found."}
        </p>
      </main>
    );
  }

  const t = (dict as any)?.article?.detail;
  const backLabel =
    t?.backButton ?? (locale === "id" ? "Kembali ke Informasi" : "Back to Information");
  const articleListPath = locale === "id" ? `/${locale}/informasi` : `/${locale}/information`;

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
          <div className="mb-6">
            <Link
              href={articleListPath}
              className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 hover:opacity-95 transition"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="w-4 h-4">
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor"
                />
              </svg>
              <span>{backLabel}</span>
            </Link>
          </div>

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
