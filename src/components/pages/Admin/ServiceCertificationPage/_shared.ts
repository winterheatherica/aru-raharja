export const SERVICE_SOLUTIONS = [
  "arudigital",
  "aruhealthcare",
  "arucontractor",
  "arusource",
  "arusolution",
  "arulog",
  "arutrans",
  "aruspace",
] as const;

export type ServiceCode = typeof SERVICE_SOLUTIONS[number];

export const serviceLabel: Record<ServiceCode, string> = {
  arudigital: "ARU Digital",
  aruhealthcare: "ARU Healthcare",
  arucontractor: "ARU Contractor",
  arusource: "ARU Source",
  arusolution: "ARU Solution",
  arulog: "ARU Log",
  arutrans: "ARU Trans",
  aruspace: "ARU Space",
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const ADMIN_SERVICE_CERTIFICATION_URL = API_BASE.endsWith("/api")
  ? `${API_BASE}/admin/service-certification`
  : `${API_BASE}/api/admin/service-certification`;
