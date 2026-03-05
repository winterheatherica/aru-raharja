type Props = {
  columns: any[];
};

export default function MatrixHeader({ columns }: Props) {
  return (
    <thead>
      <tr className="text-center">
        <th className="w-[20%]" />
        {columns.map((col) => (
          <th key={col.id} className="px-2 bg-bumn-gradient">
            <div
              className={`px-4 py-3 text-sm font-semibold rounded-2xl
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