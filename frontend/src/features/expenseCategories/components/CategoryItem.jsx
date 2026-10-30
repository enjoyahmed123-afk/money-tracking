import { FiEdit2, FiTrash2, FiLock } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function CategoryItem({ category, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <Card hover padding="p-4" className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: category.color }} />
        <div>
          <div className="text-sm font-semibold text-slate-100">{category.isDefault ? t(category.name) : category.name}</div>
          <div className="text-[11px] text-slate-500">{category.count} {t("expenses")}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {category.isDefault ? (
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-600" title={t("Default category")}>
            <FiLock className="text-xs" />
          </span>
        ) : (
          <>
            <button onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 hover:text-teal-300">
              <FiEdit2 className="text-xs" />
            </button>
            <button onClick={onDelete} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-red-400/10 hover:text-red-400">
              <FiTrash2 className="text-xs" />
            </button>
          </>
        )}
      </div>
    </Card>
  );
}
