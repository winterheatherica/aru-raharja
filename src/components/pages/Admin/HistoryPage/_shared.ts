export type HistoryItem = {
  id: string;
  language: string;
  year?: number | null;
  title?: string | null;
  description?: string | null;
  table_headers?: string[];
  table_rows?: string[][];
  is_active: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_HISTORY_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/history` : `${API_BASE}/api/admin/history`;
