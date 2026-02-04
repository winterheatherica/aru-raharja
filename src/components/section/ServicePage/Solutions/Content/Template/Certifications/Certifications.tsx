"use client";

import CertificationCard from "./CertificationCard";

type Props = {
  items: any[];
};

export default function Certifications({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-bumnblue-1">
          Certifications & Compliance
        </h3>
        <p className="mt-2 text-sm text-bumnslate-8">
          Certifications that ensure service quality, compliance, and reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CertificationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
