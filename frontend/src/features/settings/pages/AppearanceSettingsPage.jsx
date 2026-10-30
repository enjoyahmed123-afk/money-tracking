import { useDispatch, useSelector } from "react-redux";
import { FiSettings, FiMoon, FiSun, FiBell } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import SettingsTabs from "@/features/settings/components/SettingsTabs.jsx";
import { setTheme } from "@/store/themeSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

const OPTIONS = [
  { value: "dark", label: "Dark", icon: FiMoon },
  { value: "light", label: "Light", icon: FiSun },
];

export default function AppearanceSettingsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div>
      <PageHeader icon={FiSettings} title="Settings" description="Manage your account and preferences" />
      <SettingsTabs />
      <Card className="max-w-2xl">
        <h3 className="mb-5 font-bold text-slate-100">{t("Preferences")}</h3>
        <div className="flex flex-col divide-y divide-white/5">
          <div className="flex flex-col gap-4 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {mode === "dark" ? <FiMoon className="text-teal-300" /> : <FiSun className="text-teal-300" />}
              <div>
                <div className="text-sm font-semibold text-slate-100">{t("Theme")}</div>
                <div className="text-xs text-slate-500">{t("Choose how MoneyFlow looks on your device")}</div>
              </div>
            </div>
            <div className="inline-flex gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
              {OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => dispatch(setTheme(value))}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                    mode === value
                      ? "bg-gradient-to-br from-teal-400 to-indigo-500 text-onaccent shadow-btn"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <Icon /> {t(label)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <FiBell className="text-teal-300" />
              <div>
                <div className="text-sm font-semibold text-slate-100">Email Notifications</div>
                <div className="text-xs text-slate-500">Debt reminders and monthly summaries</div>
              </div>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-[#fff]" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
