import TwemojiText from "./TwemojiText";

type LayoutType = "POLISH" | "TEXT" | "OTHER";

type HeroSlideOverlayProps = {
  title: string;
  description?: string;
  ctaHref?: string;
  layout: LayoutType;
};

export default function HeroSlideOverlay({
  title,
  description,
  ctaHref: _ctaHref,
  layout,
}: HeroSlideOverlayProps) {
  if (!title && !description) return null;

  if (layout === "TEXT") {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-start pl-[12%]">
        <div
          className="
            max-w-[70%]
            md:max-w-[55%]
            pr-6
          "
        >
          {title && (
            <h2
              className="
                font-inter font-bold capitalize text-white
                leading-tight
                text-xl
                md:text-3xl
                2xl:text-5xl
                text-stroke-sm
              "
            >
              <TwemojiText text={title} />
            </h2>
          )}

          {description && (
            <p
              className="
                hidden
                sm:block
                mt-2
                font-sans text-white
                leading-relaxed
                md:text-xl
                2xl:text-3xl
                text-stroke-sm
              "
            >
            <TwemojiText text={description} />
            </p>
          )}
        </div>
      </div>
    );
  }


  return null;
}
