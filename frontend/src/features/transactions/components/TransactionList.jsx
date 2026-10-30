import { useState } from "react";
import { Table, THead, TBody, TR, TH } from "@/components/ui/Table.jsx";
import Pagination from "@/components/common/Pagination.jsx";
import TransactionRow from "@/features/transactions/components/TransactionRow.jsx";
import DeleteTransactionDialog from "@/features/transactions/components/DeleteTransactionDialog.jsx";

const MOCK = [
  { id: 1, description: "Grocery shopping", account: "Main Bank", type: "expense", date: "Sep 15", amount: -84.2 },
  { id: 2, description: "Freelance payment", account: "Vodafone Cash", type: "income", date: "Sep 14", amount: 650 },
  { id: 3, description: "Cash withdrawal", account: "Main Bank", type: "transfer", date: "Sep 12", amount: -200 },
  { id: 4, description: "Rent", account: "Main Bank", type: "expense", date: "Sep 10", amount: -900 },
  { id: 5, description: "Monthly salary", account: "Main Bank", type: "income", date: "Sep 1", amount: 4200 },
];

export default function TransactionList() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH>Description</TH>
            <TH>Account</TH>
            <TH>Type</TH>
            <TH>Date</TH>
            <TH>Amount</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {MOCK.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onDelete={() => setDeleteOpen(true)} />
          ))}
        </TBody>
      </Table>

      <div className="mt-5">
        <Pagination page={page} totalPages={4} onChange={setPage} />
      </div>

      <DeleteTransactionDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => setDeleteOpen(false)} />
    </>
  );
}
