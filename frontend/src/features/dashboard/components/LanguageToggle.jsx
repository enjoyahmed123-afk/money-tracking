import { useDispatch } from "react-redux";
import { FiGlobe } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation.js";
import { changeLocale } from "@/store/languageSlice";

export default function LanguageToggle() {
  const dispatch = useDispatch();
  const { locale } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => dispatch(changeLocale(locale === "en" ? "ar" : "en"))}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
      title="Switch language"
    >
      <FiGlobe />
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
