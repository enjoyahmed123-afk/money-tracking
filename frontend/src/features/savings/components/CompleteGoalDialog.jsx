import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";

export default function CompleteGoalDialog({ open, onClose, onConfirm }) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Mark goal as complete?"
      description="Congratulations! This will move the goal to your completed list."
      confirmLabel="Complete Goal"
    />
  );
}
