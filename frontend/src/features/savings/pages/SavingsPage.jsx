import { useState } from "react";
import { FiTarget, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import SavingsGoalCard from "@/features/savings/components/SavingsGoalCard.jsx";
import GoalForm from "@/features/savings/components/GoalForm.jsx";
import DepositWithdrawDialog from "@/features/savings/components/DepositWithdrawDialog.jsx";

const GOALS = [
  { id: 1, name: "Emergency Fund", saved: 2400, target: 5000, targetDate: "Dec 2026" },
  { id: 2, name: "New Laptop", saved: 900, target: 1500, targetDate: "Nov 2026" },
  { id: 3, name: "Vacation", saved: 300, target: 2000, targetDate: "Jun 2027" },
];

export default function SavingsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <div>
      <PageHeader
        icon={FiTarget}
        title="Savings Goals"
        description="Save with purpose — track progress toward what matters"
        actions={
          <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
            New Goal
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {GOALS.map((goal) => (
          <SavingsGoalCard key={goal.id} goal={goal} onDeposit={() => setDepositOpen(true)} />
        ))}
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="New Savings Goal">
        <GoalForm onCancel={() => setFormOpen(false)} />
      </Modal>
      <DepositWithdrawDialog open={depositOpen} onClose={() => setDepositOpen(false)} />
    </div>
  );
}
