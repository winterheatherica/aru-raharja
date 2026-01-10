"use client";

import ServiceDescription from "./Template/Description/Description";

type Props = {
  activeId: string;
  dict: any;
};

export default function Content({ activeId, dict }: Props) {
  const data =
    dict?.service?.solutions?.descriptions?.[activeId];

  if (!data) return null;

  return (
    <div className="space-y-10 pb-10">
      <ServiceDescription
        title={data.title}
        description={data.description}
      />
    </div>
  );
}
