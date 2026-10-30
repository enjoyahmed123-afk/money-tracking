import { FiZap } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import QuickAddCashForm from "@/features/cash/components/QuickAddCashForm.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function QuickAddCash() {
  const { t } = useTranslation();
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2.5">
        <FiZap className="text-amber-300" />
        <h3 className="font-bold text-slate-100">{t("Quick Add")}</h3>
        <span className="ml-auto text-[11px] font-semibold text-slate-500">{t("under 10 seconds")}</span>
      </div>
      <QuickAddCashForm />
    </Card>
  );
}
