import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DeleteExpenseDialog({ open, onClose, onConfirm, expenseName = "this expense" }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title={t("Delete expense?")}
      description={t('Are you sure you want to delete "{name}"? The linked account balance will be restored.').replace("{name}", expenseName)}
      confirmLabel={t("Delete")}
    />
  );
}
