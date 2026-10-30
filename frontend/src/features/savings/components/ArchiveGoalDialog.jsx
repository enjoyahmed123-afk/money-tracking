import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";

export default function ArchiveGoalDialog({ open, onClose, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Archive this goal?"
      description="Archived goals are hidden from your active list but not deleted."
      confirmLabel="Archive"
    />
  );
}
