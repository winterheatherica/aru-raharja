"use client";

type Props = {
  dict?: any;
};

export default function Business({ dict }: Props) {
  const t = dict?.about?.business;

  return (
    <section className="mt-8 lg:mt-14">
      <h3 className="text-2xl font-bold font-helvetica text-bumngreen-1">
        {t?.title ?? "Business Fields"}
      </h3>

      <div className="mt-6 space-y-6 font-semibold font-lato text-[18px] leading-[30px]">
        <p>{t?.intro}</p>
        <div>
          <h4 className="text-primary">
            {t?.coreTitle ?? "Core Business Activities"}
          </h4>
          <ul className="ml-4 list-decimal space-y-2">
            {t?.coreItems?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {(t?.extraParagraphs ?? []).map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
