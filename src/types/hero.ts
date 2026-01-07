export type HeroSlideAPI = {
  id: string;
  src: string;
  alt: string;
  title: string;
  ctaLabel?: string | null;
  banner: "POLISH" | "TEXT" | "FAQ" | "SERVICE" | "COMPLAINT" | "NEWS";
  order: number;
};
