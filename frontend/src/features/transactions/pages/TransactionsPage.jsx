import { useState } from "react";
import { FiList, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Card from "@/components/ui/Card.jsx";
import Modal from "@/components/ui/Modal.jsx";
import TransactionFilters from "@/features/transactions/components/TransactionFilters.jsx";
import TransactionForm from "@/features/transactions/components/TransactionForm.jsx";
import TransactionList from "@/features/transactions/components/TransactionList.jsx";

export default function TransactionsPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <PageHeader
        icon={FiList}
        title="Transactions"
        description="Full history of everything happening across your accounts"
        actions={
          <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
            Add Transaction
          </Button>
        }
      />

      <Card padding="p-5" className="mb-5">
        <TransactionFilters />
      </Card>

      <TransactionList />

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Add Transaction">
        <TransactionForm onCancel={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
}
