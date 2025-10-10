"use client";

export default function LeftStatement({ html }: { html: string }) {
  return (
    <span className="text-white font-sans text-lg font-normal sm:text-xl lg:text-2xl lg:leading-9 block w-[304px]">
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
