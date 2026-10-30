// Number/currency formatting helpers.
export function formatCurrency(amount, currency = "EGP") {
  return `${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}
