import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";

const MOCK = [
  { id: 1, date: "Sep 5, 2026", type: "Deposit", amount: 200 },
  { id: 2, date: "Aug 5, 2026", type: "Deposit", amount: 200 },
  { id: 3, date: "Jul 20, 2026", type: "Withdraw", amount: -50 },
];

export default function GoalTransactionsList() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Date</TH>
          <TH>Type</TH>
          <TH>Amount</TH>
        </TR>
      </THead>
      <TBody>
        {MOCK.map((row) => (
          <TR key={row.id}>
            <TD className="text-slate-400">{row.date}</TD>
            <TD className="text-slate-300">{row.type}</TD>
            <TD className={`font-bold ${row.amount < 0 ? "text-red-400" : "text-emerald-400"}`}>
              {row.amount < 0 ? "-" : "+"}${Math.abs(row.amount)}
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
