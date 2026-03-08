import type { Dictionary } from "@/i18n/get_dictionary";

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT";

export function getEmploymentLabel(
  type: EmploymentType,
  dict: Dictionary
): string {
  return (
    dict.career?.registration?.employment?.[type] ?? type
  );
}