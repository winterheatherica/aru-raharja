"use client";

type LeftStatementProps = {
  htmlDesktop: string;
  htmlMobile: string;
};

export default function LeftStatement({
  htmlDesktop,
  htmlMobile,
}: LeftStatementProps) {
  return (
    <span
      className="
        text-white
        font-sans
        font-normal
        block
        md:max-w-[500px]
        lg:max-w-[420px]
        text-xl
        sm:text-2xl
        lg:text-3xl
        leading-relaxed
        lg:leading-[1.4]
      "
    >
      <span
        className="block md:hidden"
        dangerouslySetInnerHTML={{ __html: htmlMobile }}
      />

      <span
        className="hidden md:block"
        dangerouslySetInnerHTML={{ __html: htmlDesktop }}
      />
    </span>
  );
}
