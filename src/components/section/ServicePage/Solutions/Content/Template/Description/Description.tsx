"use client";

import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  title: string;
  description: string;
};

export default function Description({ title, description }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className={`space-y-3 transition-all duration-[1000ms] ease-out will-change-transform will-change-opacity ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      <h2 className="text-2xl lg:text-4xl font-semibold leading-snug">
        {title}
      </h2>
      <p className="text-bumnslate-5 text-base lg:text-lg">
        {description}
      </p>
    </section>
  );
}
