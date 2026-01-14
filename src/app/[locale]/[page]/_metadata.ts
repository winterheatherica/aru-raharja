import type { Metadata } from "next";

export function buildSocialMeta(meta: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: "index, follow",

    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "PT Aru Raharja",
      type: "website",
      images: meta.image
        ? [
            {
              url: meta.image,
              alt: meta.title,
              type: "image/png",
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
}
