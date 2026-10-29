export function formatMoney(amount, currency = "EGP") {
  const n = Number(amount) || 0;
  return `${n.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateTime(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("ar-EG", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function formatDateInput(date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
