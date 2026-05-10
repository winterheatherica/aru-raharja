import type { Metadata } from "next";

type ImageType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/avif"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"
  | "image/x-icon";

const IMAGE_TYPE_MAP: Record<string, ImageType> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".tiff": "image/tiff",
  ".ico": "image/x-icon",
};

function getImageType(url: string): ImageType {
  const cleanUrl = url.split("?")[0].toLowerCase();

  const ext = Object.keys(IMAGE_TYPE_MAP).find((ext) =>
    cleanUrl.endsWith(ext)
  );

  return ext ? IMAGE_TYPE_MAP[ext] : "image/jpeg";
}

type ArticleMeta = {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

export function buildSocialMeta(meta: {
  title: string;
  description?: string;
  image?: string;
  images?: Array<{ url: string; alt?: string }>;
  keywords?: string;
  type?: "website" | "article";
  article?: ArticleMeta;
  locale?: string;
  alternateLocale?: string[];
}): Metadata {
  const ogImages: Array<{ url: string; alt: string; type: ImageType }> = (() => {
    if (meta.images && meta.images.length > 0) {
      return meta.images.map((img) => ({
        url: img.url,
        alt: img.alt || meta.title,
        type: getImageType(img.url),
      }));
    }
    if (meta.image) {
      return [
        {
          url: meta.image,
          alt: meta.title,
          type: getImageType(meta.image),
        },
      ];
    }
    return [];
  })();

  const twitterPrimary = ogImages[0];
  const ogType = meta.type ?? "website";

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title: meta.title,
    description: meta.description,
    siteName: "PT Aru Raharja",
    type: ogType,
    images: ogImages,
    locale: meta.locale,
    alternateLocale: meta.alternateLocale,
  };

  if (ogType === "article" && meta.article) {
    (openGraph as any).publishedTime = meta.article.publishedTime;
    (openGraph as any).modifiedTime = meta.article.modifiedTime;
    (openGraph as any).authors = meta.article.authors;
    (openGraph as any).section = meta.article.section;
    (openGraph as any).tags = meta.article.tags;
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: "index, follow",

    openGraph,

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: twitterPrimary
        ? [
            {
              url: twitterPrimary.url,
              alt: twitterPrimary.alt,
            },
          ]
        : [],
    },
  };
}
