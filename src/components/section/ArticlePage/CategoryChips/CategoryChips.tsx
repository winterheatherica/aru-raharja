import type { ArticleCategory } from "@/components/section/ArticlePage/types";

type Props = {
  categories: ArticleCategory[];
};

export default function CategoryChips({ categories }: Props) {
  if (!categories.length) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-3">
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
