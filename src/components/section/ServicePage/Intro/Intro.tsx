"use client";

type IntroDict = {
  paragraph: string;
};

type Props = {
  dict?: {
    service?: {
      intro?: IntroDict;
    };
  };
};

export default function Intro({ dict }: Props) {
  const t = dict?.service?.intro;
  if (!t) return null;

  return (
    <section className="px-2 md:px-16 lg:px-24 space-y-8 lg:space-y-12">
      <div className="mt-8 text-xl font-lato">
        <p>{t.paragraph}</p>
      </div>
    </section>
  );
}
