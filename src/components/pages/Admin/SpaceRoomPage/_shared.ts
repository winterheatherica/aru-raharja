export type SpaceRoomTranslation = {
  language?: string;
  title?: string;
  description?: string;
  slug?: string;
  facilities?: string[];
  meta_keywords?: string[];
  meta_title?: string;
  meta_description?: string;
};

export type SpaceRoomImage = {
  id: string;
  image_url: string;
  is_thumbnail?: boolean;
  alt?: string;
  title?: string;
};

export type SpaceRoomItem = {
  id: string;
  code: string;
  capacity?: number;
  floor?: number;
  address?: string;
  main_image_url?: string;
  is_active?: boolean;
  uploaded_by_name?: string;
  created_at?: string;
  updated_at?: string;
  translations?: SpaceRoomTranslation[];
  images?: SpaceRoomImage[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const ADMIN_SPACE_ROOM_URL = API_BASE.endsWith("/api")
  ? `${API_BASE}/admin/space-room`
  : `${API_BASE}/api/admin/space-room`;

export function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "space-room";
}
