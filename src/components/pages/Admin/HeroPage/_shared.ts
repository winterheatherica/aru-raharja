export type HeroTranslation = {
  language: string;
  alt?: string | null;
  title?: string | null;
  description?: string | null;
};

export type HeroItem = {
  id: string;
  image_path: string;
  main_image_url?: string;
  order_index: number;
  is_active: boolean;
  banner: string;
  translations: HeroTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_HERO_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/hero` : `${API_BASE}/api/admin/hero`;
export const ASSET_BASE = API_BASE.endsWith("/api") ? `${API_BASE}/assets` : `${API_BASE}/api/assets`;

export function heroImageSrc(item: HeroItem) {
  const direct = item.main_image_url || "";
  if (direct.startsWith("http://") || direct.startsWith("https://")) return direct;

  const path = item.image_path || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}
