// import ProgressBar from "@/components/ui/ProgressBar.jsx";
// import { formatCurrency } from "@/utils/format.js";
// import { useTranslation } from "@/hooks/useTranslation.js";

// export default function DebtProgressBar({ paid, total, currency }) {
//   const { t } = useTranslation();
//   const pct = total > 0 ? Math.round((paid / total) * 100) : 0;
//   return (












//     <div>
//       <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-400">
//         <span>{formatCurrency(paid, currency)} {t("paid")}</span>
//         <span>{formatCurrency(total, currency)} {t("total")}</span>
//       </div>
//       <ProgressBar value={pct} color={pct > 66 ? "emerald" : pct > 33 ? "teal" : "amber"} showLabel />
//     </div>
//   );
// }



// اللى ذاكرتة
import ProgressBar from "@/components/ui/ProgressBar.jsx";
import { formatCurrency} from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

//4. إنشاء الـ Component
export default function DebtProgressBar({ paid, total, currency}) {
  const { t} = useTranslation();
  const pct = total > 0 ? Math.round((paid / total) * 100): 0;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-400">
        <span>
          {formatCurrency(paid, currency)} {t("paid")}
        </span>
        <span>
          {formatCurrency(total, currency)} {t("total")}
        </span>
      </div>
      <ProgressBar
      value={pct}
      color={
        pct > 66
        ? "emerald"
        : pct >33
        ? "teal"
        : "amber"
      } showLabel
      />
    </div>
  )
}
