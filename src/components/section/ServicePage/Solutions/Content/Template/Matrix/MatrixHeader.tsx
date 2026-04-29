type Props = {
  columns: any[];
  compact?: boolean;
};

export default function MatrixHeader({ columns, compact = false }: Props) {
  return (
    <thead>
      <tr className="text-center">
        <th className="w-[20%]" />
        {columns.map((col) => (
          <th key={col.id} className={compact ? "px-0 bg-bumn-gradient" : "px-2 bg-bumn-gradient"}>
            <div
              className={`${compact ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm"} font-semibold ${compact ? "rounded-none" : "rounded-2xl"}
              ${
                col.popular
                  ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2"
                  : "bg-white border border-bumnblue-5 text-bumnblue-1"
              }`}
            >
              {col.label}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}