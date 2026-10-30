// App-wide constants placeholder (e.g. currency list, pagination size, date formats).
export const DEFAULT_CURRENCY = "USD";

export const CURRENCIES = ["EGP", "USD", "EUR", "SAR", "AED", "GBP"];

// Built-in expense categories — always available, cannot be edited or deleted.
// Custom categories a user creates (ExpenseCategory model) are layered on top of these.
export const DEFAULT_EXPENSE_CATEGORIES = [
  { name: "Food", color: "#2dd4bf" },
  { name: "Transport", color: "#6366f1" },
  { name: "Rent", color: "#22d3ee" },
  { name: "Bills", color: "#fbbf24" },
  { name: "Health", color: "#f87171" },
  { name: "Education", color: "#34d399" },
  { name: "Entertainment", color: "#a78bfa" },
  { name: "Other", color: "#94a3b8" },
];

export const EXPENSE_TYPES = [
  { value: "daily", label: "Daily", color: "amber" },
  { value: "fixed", label: "Monthly Fixed", color: "slate" },
  { value: "emergency", label: "Emergency", color: "red" },
];

export const PAYMENT_METHODS = ["cash", "card", "wallet"];
