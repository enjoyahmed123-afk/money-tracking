import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function MarkPaidDialog({ open, onClose, onConfirm }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={t("Mark debt as paid?")}
      description={t("This will move the debt to your completed list.")}
      confirmLabel={t("Mark as Paid")}
    />
  );
}
