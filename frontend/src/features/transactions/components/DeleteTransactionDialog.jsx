import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";

export default function DeleteTransactionDialog({ open, onClose, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title="Delete transaction?"
      description="This will remove the entry and reverse its effect on the account balance."
      confirmLabel="Delete"
    />
  );
}
