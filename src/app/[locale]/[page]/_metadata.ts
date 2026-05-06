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
              type: getImageType(meta.image),
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image
        ? [
            {
              url: meta.image,
              alt: meta.title,
            },
          ]
        : [],
    },
  };
}
