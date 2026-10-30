import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DeleteAccountDialog({ open, onClose, onConfirm, accountName = "this account" }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title={t("Delete account?")}
      description={t('Deleting "{name}" will permanently remove it along with its transaction history.').replace("{name}", accountName)}
      confirmLabel={t("Delete")}
    />
  );
}
