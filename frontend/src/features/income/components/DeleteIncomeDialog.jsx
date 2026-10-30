import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DeleteIncomeDialog({ open, onClose, onConfirm, incomeName = "this income" }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title={t("Delete income source?")}
      description={`${t('Are you sure you want to delete "{name}"? This action cannot be undone.').replace("{name}", incomeName)}`}
      confirmLabel={t("Delete")}
    />
  );
}
