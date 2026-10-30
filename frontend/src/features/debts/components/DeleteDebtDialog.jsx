import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DeleteDebtDialog({ open, onClose, onConfirm, creditorName = "this debt" }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title={t("Delete debt?")}
      description={t('Delete the debt with "{name}"? All payment history will be lost.').replace("{name}", creditorName)}
      confirmLabel={t("Delete")}
    />
  );
}
