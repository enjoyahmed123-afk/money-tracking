const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function monthRange(year, month) {
  return {
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0, 23, 59, 59, 999),
  };
}

// Resolves a PeriodSelector value ("this-month" | "last-month" | "last-3-months" | "custom")
// into an actual [start, end] date range plus a human label for display.
export function resolvePeriodRange(period, custom = {}) {
  const now = new Date();

  if (period === "last-month") {
    const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const { start, end } = monthRange(d.getFullYear(), d.getMonth());
    return { start, end, label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` };
  }

  if (period === "last-3-months") {
    const from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const { end } = monthRange(now.getFullYear(), now.getMonth());
    return { start: from, end, label: `${MONTH_NAMES[from.getMonth()]} – ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}` };
  }

  if (period === "custom" && custom.from && custom.to) {
    const start = new Date(custom.from);
    const end = new Date(`${custom.to}T23:59:59`);
    return { start, end, label: `${start.toLocaleDateString()} – ${end.toLocaleDateString()}` };
  }

  // "this-month" (also the fallback for an incomplete custom range)
  const { start, end } = monthRange(now.getFullYear(), now.getMonth());
  return { start, end, label: `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}` };
}
