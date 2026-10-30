import { useSelector } from "react-redux";
import { translations } from "@/i18n/translations.js";

export function useTranslation() {
  const locale = useSelector((state) => state.language.locale);
  const t = (key) => translations[locale]?.[key] ?? key;
  return { t, locale, isRtl: locale === "ar" };
}
