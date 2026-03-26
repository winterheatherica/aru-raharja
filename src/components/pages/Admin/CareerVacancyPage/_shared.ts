export type CareerVacancyTranslation = {
  language: string;
  description?: string | null;
};

export type CareerVacancyItem = {
  id: string;
  title: string;
  slug: string;
  employment: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT" | string;
  location: string;
  is_active: boolean;
  opened_at: string;
  closed_at?: string | null;
  translations: CareerVacancyTranslation[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export const ADMIN_CAREER_URL = API_BASE.endsWith("/api") ? `${API_BASE}/admin/career-vacancy` : `${API_BASE}/api/admin/career-vacancy`;
