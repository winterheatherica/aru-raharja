"use client";

import MetricItem from "./MetricItem";

type Metric = { value: number; label: string };

export default function Metrics({ items }: { items: Metric[] }) {
  return (
    <div className="flex flex-col gap-8 md:items-center md:flex-row md:gap-12 lg:gap-24">
      {items.map((m, i) => (
        <MetricItem key={i} value={m.value} label={m.label} />
      ))}
    </div>
  );
}
