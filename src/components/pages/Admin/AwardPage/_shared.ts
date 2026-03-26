export type AwardTranslation = {
  language: string;
  alt?: string | null;
  title?: string | null;
  label?: string | null;
  description?: string | null;
};

export type AwardItem = {
  id: string;
  image_path: string;
  image_url?: string;
  year?: number | null;
  order_index: number;
  is_active: boolean;
  translations: AwardTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_AWARD_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/award` : `${API_BASE}/api/admin/award`;
export const ASSET_BASE = API_BASE.endsWith("/api") ? `${API_BASE}/assets` : `${API_BASE}/api/assets`;

export function awardImageSrc(item: AwardItem) {
  const direct = item.image_url || "";
  if (direct.startsWith("http://") || direct.startsWith("https://")) return direct;

  const path = item.image_path || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}
