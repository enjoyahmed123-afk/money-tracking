import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import * as api from "../api/accounts";
import { apiErrorMessage } from "../api/client";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import { FormField, Input } from "../components/ui/Field";
import { formatMoney, formatDateTime } from "../utils/format";
import { ACCOUNT_TYPES } from "../utils/constants";

const TYPE_LABEL = { credit: "إيداع", debit: "خصم", adjustment: "تعديل يدوي" };

export default function AccountTransactions() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [account, setAccount] = useState(location.state?.account ?? null);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ start: "", end: "" });

  useEffect(() => {
    if (!account) {
      api.listAccounts().then((all) => {
        const found = all.find((a) => a._id === id);
        if (!found) {
          toast.error("الحساب مش موجود");
          navigate("/accounts", { replace: true });
          return;
        }
        setAccount(found);
      });
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function load(params) {
    setLoading(true);
    api
      .getAccountTransactions(id, params)
      .then(setTxns)
      .catch((err) => toast.error(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function applyFilter(e) {
    e.preventDefault();
    load({ start: range.start || undefined, end: range.end || undefined });
  }

  function clearFilter() {
    setRange({ start: "", end: "" });
    load();
  }

  const info = account ? ACCOUNT_TYPES.find((t) => t.value === account.type) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/accounts" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">←</Link>
        <h1 className="text-xl font-bold text-gray-900">تاريخ الحركات</h1>
      </div>

      {account && (
        <Card className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-lg text-white"
              style={{ backgroundColor: account.color }}
            >
              {info?.icon}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{account.name}</p>
              <p className="text-xs text-gray-400">{info?.label}</p>
            </div>
          </div>
          <p className={`text-xl font-bold ${account.balance < 0 ? "text-red-500" : "text-gray-900"}`}>
            {formatMoney(account.balance, account.currency)}
          </p>
        </Card>
      )}

      <Card className="p-4">
        <form onSubmit={applyFilter} className="flex flex-wrap items-end gap-3">
          <FormField label="من تاريخ">
            <Input type="date" value={range.start} onChange={(e) => setRange((r) => ({ ...r, start: e.target.value }))} />
          </FormField>
          <FormField label="إلى تاريخ">
            <Input type="date" value={range.end} onChange={(e) => setRange((r) => ({ ...r, end: e.target.value }))} />
          </FormField>
          <Button type="submit" variant="secondary">تطبيق الفلتر</Button>
          {(range.start || range.end) && (
            <Button type="button" variant="ghost" onClick={clearFilter}>مسح الفلتر</Button>
          )}
        </form>
      </Card>

      {loading ? (
        <Spinner full />
      ) : txns.length === 0 ? (
        <EmptyState icon="📭" title="مفيش حركات في الفترة دي" />
      ) : (
        <Card className="divide-y divide-gray-100">
          {txns.map((t) => (
            <div key={t._id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800">{t.description}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {formatDateTime(t.date)} · {TYPE_LABEL[t.type] ?? t.type}
                </p>
              </div>
              <div className="shrink-0 text-left">
                <p className={`text-sm font-bold ${t.type === "debit" ? "text-red-500" : t.type === "credit" ? "text-teal-600" : "text-gray-700"}`}>
                  {t.type === "debit" ? "-" : t.type === "credit" ? "+" : ""}{formatMoney(t.amount, account?.currency)}
                </p>
                <p className="text-xs text-gray-400">الرصيد بعدها: {formatMoney(t.balanceAfter, account?.currency)}</p>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
