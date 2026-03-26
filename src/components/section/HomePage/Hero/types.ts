export type HeroSlideAPI = {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string | null;
  banner: "POLISH" | "TEXT" | "FAQ" | "SERVICE" | "COMPLAINT" | "NEWS";
  order: number;
};
