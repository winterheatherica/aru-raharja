export type ClientTranslation = {
  language: string;
  title?: string | null;
  alt?: string | null;
  description?: string | null;
};

export type ClientItem = {
  id: string;
  image_path: string;
  image_url?: string;
  order_index: number;
  is_active_client_scroller: boolean;
  translations: ClientTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_CLIENT_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/client` : `${API_BASE}/api/admin/client`;
export const ASSET_BASE = API_BASE.endsWith("/api") ? `${API_BASE}/assets` : `${API_BASE}/api/assets`;

export function clientImageSrc(item: ClientItem) {
  const direct = item.image_url || "";
  if (direct.startsWith("http://") || direct.startsWith("https://")) return direct;

  const path = item.image_path || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}
