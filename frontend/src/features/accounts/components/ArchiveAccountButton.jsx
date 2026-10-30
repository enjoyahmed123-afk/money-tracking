import { FiArchive, FiRotateCcw } from "react-icons/fi";
import Button from "@/components/ui/Button.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function ArchiveAccountButton({ isArchived, onClick }) {
  const { t } = useTranslation();
  return (
    <Button variant="outline" icon={isArchived ? FiRotateCcw : FiArchive} onClick={onClick}>
      {isArchived ? t("Unarchive Account") : t("Archive Account")}
    </Button>
  );
}
