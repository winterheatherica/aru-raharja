"use client";

type Props = {
  dict?: any;
};

export default function Culture({ dict }: Props) {
  const t = dict?.about?.culture;

  return (
    <section className="mt-8 lg:mt-14 pb-6">
      <h3 className="text-2xl font-bold font-helvetica text-bumngreen-1">
        {t?.title}
      </h3>

      <div className="mt-6 space-y-6 font-semibold font-lato text-[18px] leading-[30px] text-justify">
        {t?.description && <p>{t.description}</p>}
      </div>
    </section>
  );
}
