"use client";

export default function RightHeadline({ html }: { html: string }) {
  return (
    <p className="text-[32px] leading-[39px] font-bold bg-bumn-gradient-primary-15 bg-clip-text text-transparent text-right">
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </p>
  );
}
