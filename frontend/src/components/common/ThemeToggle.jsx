import { useDispatch, useSelector } from "react-redux";
import { FiMoon, FiSun } from "react-icons/fi";
import { toggleTheme } from "@/store/themeSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function ThemeToggle({ className = "" }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      title={isDark ? t("Switch to light mode") : t("Switch to dark mode")}
      aria-label={isDark ? t("Switch to light mode") : t("Switch to dark mode")}
      className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-slate-100 ${className}`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
