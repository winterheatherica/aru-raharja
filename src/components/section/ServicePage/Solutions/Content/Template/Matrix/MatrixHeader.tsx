type Props = {
  columns: any[];
};

export default function MatrixHeader({ columns }: Props) {
  return (
    <thead>
      <tr>
        <th className="w-[20%]" />
        {columns.map((col) => (
          <th
            key={col.id}
            className={`px-4 py-3 text-sm font-semibold text-center rounded-xl
              ${
                col.popular
                  ? "bg-bumn-gradient-primary-7 text-white shadow-bumn-2"
                  : "bg-bumnwhite-3 text-bumnslate-6"
              }`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
