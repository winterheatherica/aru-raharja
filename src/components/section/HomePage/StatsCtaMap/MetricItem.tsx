"use client";

export default function MetricItem({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="relative flex h-full gap-3">
      <div className="w-[7px] bg-bumn-gradient-primary-17" />
      <div className="flex flex-col mb-1">
        <p className="text-[64px] font-bold leading-[64px]">{value}</p>
        <p className="text-2xl font-light">{label}</p>
      </div>
    </div>
  );
}
