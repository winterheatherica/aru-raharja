import MatrixCell from "./MatrixCell";

type Props = {
  row: any;
  columns: any[];
};

export default function MatrixRow({ row, columns }: Props) {
  return (
    <tr>
      <td className="px-2 py-3">
        <div className="px-4 py-3 text-sm font-medium text-bumnslate-6 bg-white rounded-2xl shadow-bumn-2 flex items-center">
          {row.feature}
        </div>
      </td>

      {columns.map((col) => {
        const cell = row.cells.find(
          (c: any) => c.column_id === col.id
        );

        return (
          <td key={col.id} className="px-2">
            <MatrixCell
              valueBoolean={cell?.value_boolean}
              valueText={cell?.value_text}
              highlight={col.popular}
            />
          </td>
        );
      })}
    </tr>
  );
}