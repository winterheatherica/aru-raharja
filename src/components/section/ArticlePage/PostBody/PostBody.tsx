"use client";

import * as React from "react";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

export default function PostBody({ article, content }: any) {
  const html = content ?? article?.content ?? "";
  if (!html) return null;

  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div
      ref={ref}
      className={`post-body mb-8 transition-all duration-[800ms] ease-out ${anim}`}
    >
      <div
        className="article-rich-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}