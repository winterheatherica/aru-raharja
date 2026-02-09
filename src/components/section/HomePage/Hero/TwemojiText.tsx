"use client";

import { useMemo } from "react";
import twemoji from "twemoji";

type Props = {
  text: string;
  className?: string;
};

export default function TwemojiText({ text, className }: Props) {
  const html = useMemo(() => {
    return twemoji.parse(text, {
      folder: "svg",
      ext: ".svg",
      className: "twemoji",
    });
  }, [text]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
