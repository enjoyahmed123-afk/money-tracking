const dateAtMidnight = (value) => new Date(`${String(value).slice(0, 10)}T00:00:00`);
const toDateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function getIncomeOccurrences(items, month) {
  if (!month) return [];
  const [year, monthNumber] = month.split("-").map(Number);
  const monthIndex = monthNumber - 1;
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);
  const occurrences = [];

  items.forEach((income) => {
    const receivedDate = dateAtMidnight(income.receivedDate);
    if (Number.isNaN(receivedDate.getTime()) || receivedDate > monthEnd) return;
    const addOccurrence = (date) => occurrences.push({ ...income, receivedDate: toDateKey(date), sourceIncome: income });

    if (income.recurrence === "once" || !income.recurrence) {
      if (receivedDate >= monthStart) addOccurrence(receivedDate);
      return;
    }
    if (income.isActive === false) return;
    if (income.recurrence === "monthly") {
      addOccurrence(new Date(year, monthIndex, Math.min(receivedDate.getDate(), monthEnd.getDate())));
    } else if (income.recurrence === "yearly" && receivedDate.getMonth() === monthIndex) {
      addOccurrence(new Date(year, monthIndex, Math.min(receivedDate.getDate(), monthEnd.getDate())));
    } else if (income.recurrence === "weekly") {
      const date = new Date(receivedDate);
      while (date < monthStart) date.setDate(date.getDate() + 7);
      while (date <= monthEnd) {
        addOccurrence(date);
        date.setDate(date.getDate() + 7);
      }
    }
  });

  return occurrences.sort((a, b) => new Date(b.receivedDate) - new Date(a.receivedDate));
}

export function getTotalsByCurrency(incomes) {
  return incomes.reduce((totals, income) => {
    const currency = income.currency || "EGP";
    totals[currency] = (totals[currency] || 0) + Number(income.amount || 0);
    return totals;
  }, {});
}

export function formatCurrencyTotals(incomes) {
  const totals = getTotalsByCurrency(incomes);
  const result = Object.entries(totals).map(([currency, amount]) => new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount));
  return result.length ? result.join(" + ") : "0";
}
