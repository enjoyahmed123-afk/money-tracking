import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";

export default function DeleteGoalDialog({ open, onClose, onConfirm, goalName = "this goal" }) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title="Delete savings goal?"
      description={`Delete "${goalName}"? This cannot be undone.`}
      confirmLabel="Delete"
    />
  );
}
