"use client";

import MatrixHeader from "./MatrixHeader";
import MatrixRow from "./MatrixRow";

type Props = {
  data: any;
};

export default function Matrix({ data }: Props) {
  if (!data || !data.columns?.length || !data.rows?.length) return null;

  const { title, description, footnote, columns, rows } = data;

  return (
    <section className="space-y-6">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-bumnblue-1">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-bumnslate-8">
            {description}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <MatrixHeader columns={columns} />
          <tbody>
            {rows.map((row: any) => (
              <MatrixRow
                key={row.id}
                row={row}
                columns={columns}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
