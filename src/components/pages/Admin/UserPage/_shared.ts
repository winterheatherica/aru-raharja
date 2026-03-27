export type UserRole = "ADMIN" | "EDITOR" | "MEMBER";

export type UserItem = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: UserRole;
  active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
};

export type UserPayload = {
  email: string;
  username: string;
  full_name: string;
  password?: string;
  role: UserRole;
  active?: boolean;
  email_verified?: boolean;
};

export const USER_ROLES: UserRole[] = ["ADMIN", "EDITOR", "MEMBER"];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_USER_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/user` : `${API_BASE}/api/admin/user`;
