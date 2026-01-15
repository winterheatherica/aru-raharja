export const BRAND = "PT Aru Raharja" as const;

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

export type ServiceSolution = typeof SERVICE_SOLUTIONS[number];
