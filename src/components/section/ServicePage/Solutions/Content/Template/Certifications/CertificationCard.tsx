type Props = {
  item: any;
};

export default function CertificationCard({ item }: Props) {
  return (
    <div className="bg-bumn-gradient-white-4 border border-bumnslate-10 rounded-xl shadow-bumn-2 p-6 space-y-3">
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


