import { useTranslation } from "@/hooks/useTranslation.js";

const LEVELS = [
  { label: "Weak", color: "bg-red-400" },
  { label: "Fair", color: "bg-amber-400" },
  { label: "Good", color: "bg-cyan-400" },
  { label: "Strong", color: "bg-emerald-400" },
];

export default function PasswordStrengthIndicator({ strength = 2 }) {
  const { t } = useTranslation();
  const level = LEVELS[Math.min(strength, LEVELS.length - 1)];
  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {LEVELS.map((l, i) => (
          <span
            key={l.label}
            className={`h-1.5 flex-1 rounded-full ${i <= strength ? level.color : "bg-white/10"}`}
          />
        ))}
      </div>
      <span className="mt-1.5 block text-xs font-semibold text-slate-500">
        {t("Password strength:")} <span className="text-slate-300">{t(level.label)}</span>
      </span>
    </div>
  );
}
