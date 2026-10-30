import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";

export default function ReportDataTable({ columns, rows }) {
  return (
    <Table>
      <THead>
        <TR>
          {columns.map((col) => (
            <TH key={col}>{col}</TH>
          ))}
        </TR>
      </THead>
      <TBody>
        {rows.map((row, i) => (
          <TR key={i}>
            {row.map((cell, j) => (
              <TD key={j} className={j === 0 ? "font-semibold text-slate-100" : ""}>
                {cell}
              </TD>
            ))}
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
