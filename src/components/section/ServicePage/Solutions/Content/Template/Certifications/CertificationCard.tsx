"use client";

type Props = {
  item: any;
  index?: number;
  visible?: boolean;
};

export default function CertificationCard({
  item,
  index = 0,
  visible = false,
}: Props) {
  return (
    <div
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`bg-bumn-gradient-white-4 border border-bumnslate-10 rounded-xl shadow-bumn-2 p-6 space-y-3
      transition-all duration-[800ms] ease-out
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <h4 className="text-sm font-semibold text-bumnblue-1">
        {item.title}
      </h4>

      {item.caption && (
        <p className="text-sm text-bumnblue-1 leading-relaxed">
          {item.caption}
        </p>
      )}

      <div className="pt-2">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-bumncyan-1 text-bumnblue-2">
          Certified
        </span>
      </div>
    </div>
  );
}