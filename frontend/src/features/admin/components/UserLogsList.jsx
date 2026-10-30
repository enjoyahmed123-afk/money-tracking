import { FiLogIn, FiEdit, FiCreditCard } from "react-icons/fi";

const LOGS = [
  { icon: FiLogIn, label: "Logged in from Cairo, EG", date: "Sep 15, 2026 — 09:12" },
  { icon: FiCreditCard, label: "Upgraded to Pro plan", date: "Aug 2, 2026 — 14:40" },
  { icon: FiEdit, label: "Updated profile information", date: "Jul 19, 2026 — 11:05" },
];

export default function UserLogsList() {
  return (
    <ul className="flex flex-col divide-y divide-white/5">
      {LOGS.map((log) => (
        <li key={log.label} className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-slate-300">
            <log.icon className="text-sm" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-200">{log.label}</div>
            <div className="text-[11px] text-slate-500">{log.date}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
