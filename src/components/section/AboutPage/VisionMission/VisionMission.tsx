"use client";

import Image from "next/image";

type Props = {
  dict?: any;
};

export default function VisionMission({ dict }: Props) {
  const t = dict?.about;

  return (
    <section className="mt-8 lg:mt-14">
      <div className="relative h-[126px] lg:h-[352px]">
        <Image
          src="/images/about/aru-raharja-visi.png"
          alt={t?.visionMission?.bannerAlt ?? "aru-raharja-visi"}
          fill
          className="object-cover object-top w-full rounded-2xl"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="mt-8 space-y-6 font-semibold text-[18px] leading-[30px] lg:mt-10 font-lato">
        <h3 className="text-2xl font-bold font-helvetica text-bumngreen-1">
          {t?.visionMission?.title ?? "Vision & Mission"}
        </h3>

        <div>
          <h4 className="text-primary">
            {t?.visionMission?.visionLabel ?? "Vision"}
          </h4>
          <p>
            {t?.visionMission?.vision ??
              "Becoming a Trusted Company in Providing Basic Protection Against Accident Risks with the Best Service"}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-primary">
            {t?.visionMission?.missionLabel ?? "Mission"}
          </h4>
          <p>
            {t?.visionMission?.mission ??
              "Providing Integrated Digital Basic Protection, Supported by Excellent Human Capital to Strengthen Stakeholder Engagement."}
          </p>
        </div>
      </div>
    </section>
  );
}
