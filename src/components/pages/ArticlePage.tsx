import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PageTopBanner from "@/components/section/ArticlePage/PageTopBanner/PageTopBanner";
import ClassicCaps from "@/components/section/ArticlePage/ClassicCaps/ClassicCaps";
import ArticleHero from "@/components/section/ArticlePage/ArticleHero/ArticleHero";
import AuthorHuman from "@/components/section/ArticlePage/AuthorHuman/AuthorHuman";
import PostBody from "@/components/section/ArticlePage/PostBody/PostBody";
import RichBlock from "@/components/section/ArticlePage/RichBlock/RichBlock";
import Poet from "@/components/section/ArticlePage/Poet/Poet";
import Sidebar from "@/components/section/ArticlePage/Sidebar/Sidebar";
import ReadMore from "@/components/section/ArticlePage/ReadMore/ReadMore";
import Comments from "@/components/section/ArticlePage/Comments/Comments";

type Article = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  created_at?: string;
  posted_by?: string;
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
          {locale === "id"
            ? "Artikel tidak ditemukan."
            : "Article not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="relative text-bumnslate-6">
      <PageTopBanner category={article.category} />

      <div className="-mt-20 px-4 mx-auto max-w-screen-1440 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-bumn-2">
            <ClassicCaps
              crumbs={[
                { label: "Home", href: `/${locale}` },
                {
                  label: article.category ?? "Blog",
                  href: `/${locale}/article`,
                },
                { label: article.title ?? "" },
              ]}
            />

            <ArticleHero article={article} />
            <AuthorHuman article={article} />
            <PostBody article={article} />
            <RichBlock />
            <Poet article={article} />

            <ReadMore
              dict={dict}
              locale={locale}
              currentSlug={article.slug}
            />

            <Comments />
          </div>

          <aside className="w-full lg:w-96 shrink-0">
            <Sidebar article={article} locale={locale} />
          </aside>
        </div>
      </div>
    </main>
  );
}
