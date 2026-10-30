// How much a single income entry contributes within an arbitrary [start, end] date range,
// accounting for recurrence (once / weekly / monthly / yearly) and whether it's paused (isActive).
export function incomeContributionInRange(inc, start, end) {
  const rd = new Date(inc.receivedDate);
  const originMonthStart = new Date(rd.getFullYear(), rd.getMonth(), 1);

  if (inc.recurrence === "once") {
    return rd >= start && rd <= end ? inc.amount : 0;
  }
  if (!inc.isActive || rd > end) return 0;

  if (inc.recurrence === "weekly") {
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    let cur = new Date(rd.getTime());
    while (cur < start) cur = new Date(cur.getTime() + weekMs);
    let count = 0;
    while (cur <= end) { count++; cur = new Date(cur.getTime() + weekMs); }
    return count * inc.amount;
  }

  // monthly / yearly: credit once for every whole calendar month, on/after the income's
  // own start month, that lies fully inside [start, end].
  let occurrences = 0;
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= lastMonth) {
    const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 23, 59, 59, 999);
    const fullyInRange = monthStart >= start && monthEnd <= end;
    const afterOrigin = monthStart >= originMonthStart;

    if (fullyInRange && afterOrigin) {
      if (inc.recurrence === "monthly") occurrences += 1;
      if (inc.recurrence === "yearly" && cursor.getMonth() === rd.getMonth()) occurrences += 1;
    }
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }
  return occurrences * inc.amount;
}

export function sumIncomeInRange(incomes, start, end) {
  return incomes.reduce((sum, inc) => sum + incomeContributionInRange(inc, start, end), 0);
}
