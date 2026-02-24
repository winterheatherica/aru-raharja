import MatrixCell from "./MatrixCell";

type Props = {
  row: any;
  columns: any[];
};

export default function MatrixRow({ row, columns }: Props) {
  return (
    <tr className="bg-bumn-gradient-white-4 rounded-xl shadow-bumn-2">
      <td className="px-4 py-3 text-sm font-medium text-bumnslate-6 rounded-l-xl">
        {row.feature}
      </td>

      {columns.map((col) => {
        const cell = row.cells.find(
          (c: any) => c.column_id === col.id
        );

        return (
          <MatrixCell
            key={col.id}
            valueBoolean={cell?.value_boolean}
            valueText={cell?.value_text}
            highlight={col.popular}
          />
        );
      })}
    </tr>
  );
}

