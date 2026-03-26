type Props = {
  headers: string[];
  rows: string[][];
  setHeaders: (next: string[]) => void;
  setRows: (next: string[][]) => void;
};

export default function HistoryTableEditor({ headers, rows, setHeaders, setRows }: Props) {
  const colCount = Math.max(headers.length, 1);

  function addColumn() {
    const nextHeaders = [...headers, ""];
    const nextRows = rows.map((r) => [...r, ""]);
    setHeaders(nextHeaders);
    setRows(nextRows);
  }

  function addRow() {
    const nextRows = [...rows, Array.from({ length: colCount }, () => "")];
    setRows(nextRows);
  }

  function setHeaderAt(idx: number, value: string) {
    const next = [...headers];
    next[idx] = value;
    setHeaders(next);
  }

  function setCell(r: number, c: number, value: string) {
    const next = rows.map((row) => [...row]);
    while (next[r].length < colCount) next[r].push("");
    next[r][c] = value;
    setRows(next);
  }

  return (
    <div className="grid gap-2 rounded-xl border border-bumnslate-10 bg-white p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-bumnslate-7">Table Matrix</p>
        <div className="flex gap-2">
          <button type="button" onClick={addColumn} className="rounded-lg border border-bumnslate-10 px-2 py-1 text-xs">+ Column</button>
          <button type="button" onClick={addRow} className="rounded-lg border border-bumnslate-10 px-2 py-1 text-xs">+ Row</button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              {Array.from({ length: colCount }).map((_, i) => (
                <th key={i} className="border border-bumnslate-10 p-1 bg-bumngray-2/20">
                  <input
                    className="w-full rounded border border-bumnslate-10 px-2 py-1"
                    placeholder={`Header ${i + 1}`}
                    value={headers[i] || ""}
                    onChange={(e) => setHeaderAt(i, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows.length ? rows : [Array.from({ length: colCount }, () => "")]).map((row, rIdx) => (
              <tr key={rIdx}>
                {Array.from({ length: colCount }).map((_, cIdx) => (
                  <td key={cIdx} className="border border-bumnslate-10 p-1">
                    <input
                      className="w-full rounded border border-bumnslate-10 px-2 py-1"
                      placeholder={`R${rIdx + 1}C${cIdx + 1}`}
                      value={row[cIdx] || ""}
                      onChange={(e) => setCell(rIdx, cIdx, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
