"use client";

import MatrixHeader from "./MatrixHeader";
import MatrixRow from "./MatrixRow";

type Props = {
  data: any;
};

export default function Matrix({ data }: Props) {
  if (!data || !data.columns?.length || !data.rows?.length) return null;

  const { title, description, footnote, columns, rows, compact } = data;
  const isCompact = Boolean(compact);

  return (
    <section className={isCompact ? "space-y-4" : "space-y-6"}>
      <div className="max-w-3xl mx-auto text-center">
        <h3 className={`${isCompact ? "text-xl" : "text-2xl"} font-semibold text-bumnblue-1`}>
          {title}
        </h3>
        {description && (
          <p className={`mt-2 ${isCompact ? "text-xs" : "text-sm"} text-bumnslate-8`}>
            {description}
          </p>
        )}
      </div>

      <div className={`${isCompact ? "overflow-x-auto rounded-none bg-bumn-gradient-white-4 border border-bumnslate-10 shadow-bumn-2" : "overflow-x-auto rounded-2xl bg-bumn-gradient-white-4 border border-bumnslate-10 shadow-bumn-2"}`}>
        <table className={`${isCompact ? "w-full border-collapse" : "w-full border-collapse"}`}>
          <MatrixHeader columns={columns} compact={isCompact} />
          <tbody className={`text-center bg-bumn-gradient-white-4 ${isCompact ? "rounded-none" : "rounded-2xl"}`}>
            {rows.map((row: any) => (
              <MatrixRow
                key={row.id}
                row={row}
                columns={columns}
                compact={isCompact}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
