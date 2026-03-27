export type NewsCategoryTranslation = {
  language?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
};

export type NewsCategoryItem = {
  id: string;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  is_active?: boolean;
  translations?: NewsCategoryTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_NEWS_CATEGORY_URL = API_BASE.endsWith("/api")
  ? `${API_BASE}/admin/news-category`
  : `${API_BASE}/api/admin/news-category`;
