import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiTrendingUp, FiTrendingDown, FiCreditCard, FiAlertCircle } from "react-icons/fi";
import Modal from "@/components/ui/Modal.jsx";
import Input from "@/components/ui/Input.jsx";
import { formatCurrency } from "@/utils/format.js";
import { fetchIncomes } from "@/store/incomeSlice";
import { fetchExpenses } from "@/store/expenseSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function GlobalSearch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { items: incomes } = useSelector((state) => state.income);
  const { items: expenses } = useSelector((state) => state.expense);
  const { items: accounts } = useSelector((state) => state.account);
  const { items: debts } = useSelector((state) => state.debt);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchExpenses());
  }, [dispatch]);

  const q = query.trim().toLowerCase();
  const results = q.length === 0 ? [] : [
    ...incomes.filter((i) => i.name.toLowerCase().includes(q)).map((i) => ({
      id: `income-${i._id}`, icon: FiTrendingUp, label: i.name,
      meta: formatCurrency(i.amount, i.currency), to: "/income",
    })),
    ...expenses.filter((e) => e.description.toLowerCase().includes(q)).map((e) => ({
      id: `expense-${e._id}`, icon: FiTrendingDown, label: e.description,
      meta: formatCurrency(e.amount, e.currency), to: "/expenses",
    })),
    ...accounts.filter((a) => a.name.toLowerCase().includes(q)).map((a) => ({
      id: `account-${a._id}`, icon: FiCreditCard, label: a.name,
      meta: formatCurrency(a.balance, a.currency), to: `/accounts/${a._id}`,
    })),
    ...debts.filter((d) => d.creditor.toLowerCase().includes(q)).map((d) => ({
      id: `debt-${d._id}`, icon: FiAlertCircle, label: d.creditor,
      meta: formatCurrency(d.remainingAmount, d.currency), to: `/debts/${d._id}`,
    })),
  ].slice(0, 20);

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-slate-100 sm:grid"
      >
        <FiSearch />
      </button>

      <Modal open={open} onClose={handleClose} title={t("Search")} size="sm">
        <Input
          icon={FiSearch}
          autoFocus
          placeholder={t("Search income, expenses, accounts, debts...")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {q.length > 0 && (
          <div className="mt-4 flex max-h-80 flex-col gap-1 overflow-y-auto">
            {results.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">{t('No matches for "{query}"').replace("{query}", query)}</p>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { navigate(r.to); handleClose(); }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/5"
                >
                  <r.icon className="shrink-0 text-slate-400" />
                  <span className="min-w-0 flex-1 truncate">{r.label}</span>
                  <span className="shrink-0 text-xs font-semibold text-slate-400">{r.meta}</span>
                </button>
              ))
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
