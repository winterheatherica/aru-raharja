export type HeroSlideAPI = {
  id: string;
  src: string;
  alt: string;
  title: string;
  ctaLabel?: string | null;
  banner: "POLISH" | "FAQ" | "SERVICE" | "COMPLAINT" | "NEWS";
  order: number;
};
