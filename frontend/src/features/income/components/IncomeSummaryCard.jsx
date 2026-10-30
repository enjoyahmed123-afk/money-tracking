import { FiTrendingUp, FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import Card from "@/components/ui/Card.jsx";
import Select from "@/components/ui/Select.jsx";
import { formatCurrency } from "@/utils/format.js";
import { incomeContributionInRange } from "@/utils/incomeMath.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function buildMonthOptions() {
  const now = new Date();
  const options = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    options.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  return options;
}

export default function IncomeSummaryCard({ period, onPeriodChange }) {
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.income);
  const options = buildMonthOptions();

  const monthStart = new Date(period.year, period.month, 1);
  const monthEnd = new Date(period.year, period.month + 1, 0, 23, 59, 59, 999);

  const totalsByCurrency = {};
  let contributingCount = 0;
  for (const inc of items) {
    const contribution = incomeContributionInRange(inc, monthStart, monthEnd);
    if (contribution > 0) {
      totalsByCurrency[inc.currency] = (totalsByCurrency[inc.currency] ?? 0) + contribution;
      contributingCount += 1;
    }
  }
  const currencies = Object.keys(totalsByCurrency);

  return (
    <Card className="bg-gradient-to-br from-teal-400/10 to-cyan-400/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Total Income")}</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <FiCalendar />
              <Select
                className="!w-auto !py-1 !text-xs"
                value={`${period.year}-${period.month}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-").map(Number);
                  onPeriodChange({ year, month });
                }}
              >
                {options.map(({ year, month }) => (
                  <option key={`${year}-${month}`} value={`${year}-${month}`}>
                    {t(MONTH_NAMES[month])} {year}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {currencies.length <= 1 ? (
            <div className="mt-2 text-3xl font-extrabold text-slate-50">
              {currencies.length === 1 ? formatCurrency(totalsByCurrency[currencies[0]], currencies[0]) : formatCurrency(0)}
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {currencies.map((c) => (
                <span key={c} className="text-2xl font-extrabold text-slate-50">
                  {formatCurrency(totalsByCurrency[c], c)}
                </span>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-slate-500">{contributingCount} {t("income sources this month")}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 text-2xl text-onaccent shadow-btn">
          <FiTrendingUp />
        </div>
      </div>
    </Card>
  );
}
