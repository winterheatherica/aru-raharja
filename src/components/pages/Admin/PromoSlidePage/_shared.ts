export type PromoSlideTranslation = {
  language: string;
  title?: string | null;
  alt?: string | null;
};

export type PromoSlideItem = {
  id: string;
  image_path: string;
  image_url?: string;
  order_index: number;
  is_active: boolean;
  translations: PromoSlideTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_PROMO_SLIDE_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/promo-slide` : `${API_BASE}/api/admin/promo-slide`;
export const ASSET_BASE = API_BASE.endsWith("/api") ? `${API_BASE}/assets` : `${API_BASE}/api/assets`;

export function promoSlideImageSrc(item: PromoSlideItem) {
  const direct = item.image_url || "";
  if (direct.startsWith("http://") || direct.startsWith("https://")) return direct;

  const path = item.image_path || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}
