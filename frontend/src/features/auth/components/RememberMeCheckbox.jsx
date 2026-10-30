import { useTranslation } from "@/hooks/useTranslation.js";

export default function RememberMeCheckbox({ className = "", ...props }) {
  const { t } = useTranslation();
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-white/20 bg-white/5 accent-teal-400 ${className}`}
        {...props}
      />
      {t("Remember me")}
    </label>
  );
}
