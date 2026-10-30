import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DeleteCategoryDialog({ open, onClose, onConfirm, categoryName = "this category" }) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      danger
      title={t("Delete category?")}
      description={t('Delete "{name}"? Expenses using it will need to be recategorized.').replace("{name}", categoryName)}
      confirmLabel={t("Delete")}
    />
  );
}
