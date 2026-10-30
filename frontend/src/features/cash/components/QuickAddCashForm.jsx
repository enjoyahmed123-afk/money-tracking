import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Button from "@/components/ui/Button.jsx";
import { addExpense } from "@/store/expenseSlice";
import { DEFAULT_EXPENSE_CATEGORIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function QuickAddCashForm({ onDone }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items: accounts } = useSelector((state) => state.account);
  const { items: customCategories } = useSelector((state) => state.expenseCategory);
  const { status } = useSelector((state) => state.expense);
  const submitting = status === "loading";

  const cashAccount = accounts.find((a) => a.type === "cash" && a.isActive);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(DEFAULT_EXPENSE_CATEGORIES[0].name);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!cashAccount) {
    return (
      <p className="text-sm text-slate-400">
        {t("You need a cash account first.")}{" "}
        <Link to="/accounts" className="font-semibold text-teal-300 hover:text-teal-200">
          {t("Add one in Accounts →")}
        </Link>
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError(t("Enter a valid amount"));
      return;
    }
    setError("");
    try {
      await dispatch(
        addExpense({
          amount: amt,
          description: description.trim() || category,
          date: new Date().toISOString().slice(0, 10),
          paymentMethod: "cash",
          expenseType: "daily",
          category,
          accountId: cashAccount._id,
        })
      ).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم تسجيل مصروف الكاش بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setAmount("");
      setDescription("");
      onDone?.();
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Something went wrong."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Input type="number" step="0.01" placeholder={t("Amount")} value={amount} onChange={(e) => setAmount(e.target.value)} />
        {error && <p className="mt-1 text-xs font-medium text-red-400">{error}</p>}
      </div>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        {DEFAULT_EXPENSE_CATEGORIES.map((c) => (
          <option key={c.name} value={c.name}>{t(c.name)}</option>
        ))}
        {customCategories.map((c) => (
          <option key={c._id} value={c.name}>{c.name}</option>
        ))}
      </Select>
      <Input placeholder={t("Description (optional)")} value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? t("Adding...") : t("Add Cash Expense")}
      </Button>
    </form>
  );
}
