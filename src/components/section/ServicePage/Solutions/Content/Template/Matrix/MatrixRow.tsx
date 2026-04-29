import MatrixCell from "./MatrixCell";

type Props = {
  row: any;
  columns: any[];
  compact?: boolean;
};

export default function MatrixRow({ row, columns, compact = false }: Props) {
  return (
    <tr>
      <td className={compact ? "px-0 py-0" : "px-2 py-4"}>
        <div className={`${compact ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm"} font-medium text-bumnblue-1 bg-white ${compact ? "rounded-none" : "rounded-2xl"} shadow-bumn-2 flex items-center border border-bumnblue-5`}>
          {row.feature}
        </div>
      </td>

      {columns.map((col) => {
        const cell = row.cells.find(
          (c: any) => c.column_id === col.id
        );

        return (
          <td key={col.id} className={compact ? "px-0" : "px-2"}>
            <MatrixCell
              valueBoolean={cell?.value_boolean}
              valueText={cell?.value_text}
              highlight={col.popular}
              compact={compact}
            />
          </td>
        );
      })}
    </tr>
  );
}