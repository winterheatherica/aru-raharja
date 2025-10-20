"use client";

import * as React from "react";

type Props = {
  title?: string;
  titleHtml?: string;
  description?: string;
  className?: string;
};

export default function SectionTitle({
  title,
  titleHtml,
  description,
  className = "",
}: Props) {
  return (
    <div className={["flex flex-col items-center justify-center mb-10 text-center", className].join(" ")}>
      {titleHtml ? (
        <h2
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize font-inter lg:leading-[54px] text-black"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize font-inter lg:leading-[54px] text-black">
          {title ?? "Section Title"}
        </h2>
      )}

      {description ? (
        <p className="font-sans text-lg font-normal sm:text-xl lg:text-2xl lg:leading-9 max-w-2xl text-black/70 mt-3">
          {description}
        </p>
      ) : null}
    </div>
  );
}
