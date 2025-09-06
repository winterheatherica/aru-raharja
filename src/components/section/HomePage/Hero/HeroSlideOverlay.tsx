import Link from "next/link";

type HeroSlideOverlayProps = {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function HeroSlideOverlay({
  title,
  ctaLabel,
  ctaHref,
}: HeroSlideOverlayProps) {
  if (!title && !ctaLabel) return null;

  return (
    <div
      className="
        absolute z-10 left-4 bottom-4 lg:left-12
        rounded-2xl text-white
        bg-black/5 backdrop-blur-md
        shadow-lg shadow-black/90
      "
      style={{
        paddingBlock: "clamp(4px, 1.5vw, 24px)",
        paddingInline: "clamp(8px, 1.5vw, 16px)",
      }}
    >
      {title ? (
        <p
          className="font-bold"
          style={{
            fontSize: "clamp(14px, 2.2vw, 40px)",
            marginBottom: "clamp(6px, 1.6vw, 20px)",
          }}
        >
          {title}
        </p>
      ) : null}

      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="
            inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium
            text-white rounded-full
            bg-black/40 backdrop-blur-md
            shadow-lg shadow-black/60
            hover:bg-black/60
          "
          style={{
            height: "clamp(34px, 3.2vw, 44px)",
            paddingInline: "clamp(12px, 2vw, 20px)",
            fontSize: "clamp(12px, 1.6vw, 18px)",
          }}
          aria-label={ctaLabel}
        >
          <span>{ctaLabel}</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
