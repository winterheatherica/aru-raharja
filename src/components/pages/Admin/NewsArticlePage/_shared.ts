export type NewsArticleTranslation = {
  language?: string | null;
  slug?: string | null;
  title?: string | null;
  content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
};

export type NewsArticleCategory = {
  id: string;
  name?: string | null;
  slug?: string | null;
};

export type NewsArticleItem = {
  id: string;
  image_path?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  published_at?: string;
  view_count?: number;
  like_count?: number;
  category_ids?: string[];
  categories?: NewsArticleCategory[];
  translations?: NewsArticleTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_NEWS_ARTICLE_URL = API_BASE.endsWith("/api")
  ? `${API_BASE}/admin/news-article`
  : `${API_BASE}/api/admin/news-article`;

export const ASSET_BASE = API_BASE.endsWith("/api") ? `${API_BASE}/assets` : `${API_BASE}/api/assets`;

export function newsArticleImageSrc(item: NewsArticleItem) {
  const direct = item.image_url || "";
  if (direct.startsWith("http://") || direct.startsWith("https://")) return direct;

  const path = item.image_path || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}

export function stripHtml(value?: string | null) {
  return (value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
