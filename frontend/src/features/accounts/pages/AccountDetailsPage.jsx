import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FiArrowLeft, FiEdit2, FiSlash } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import DateRangeFilter from "@/components/common/DateRangeFilter.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import AccountTransactionsList from "@/features/accounts/components/AccountTransactionsList.jsx";
import AdjustBalanceDialog from "@/features/accounts/components/AdjustBalanceDialog.jsx";
import ArchiveAccountButton from "@/features/accounts/components/ArchiveAccountButton.jsx";
import { fetchAccounts, toggleArchive } from "@/store/accountSlice";
import { getAccountTransactions } from "@/api/accounts.api";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function AccountDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status: accountsStatus } = useSelector((state) => state.account);
  const account = items.find((a) => a._id === id);

  const [adjustOpen, setAdjustOpen] = useState(false);
  const [range, setRange] = useState({ from: "", to: "" });
  const [transactions, setTransactions] = useState([]);
  const [loadingTxns, setLoadingTxns] = useState(true);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchAccounts());
  }, [dispatch, items.length]);

  useEffect(() => {
    setLoadingTxns(true);
    getAccountTransactions(id, { start: range.from || undefined, end: range.to || undefined })
      .then((res) => setTransactions(res.data.data))
      .catch(() => setTransactions([]))
      .finally(() => setLoadingTxns(false));
  }, [id, range]);

  const handleToggleArchive = async () => {
    try {
      await dispatch(toggleArchive(account._id)).unwrap();
      Swal.fire({
        icon: "success",
        title: account.isActive ? t("تم تعطيل الحساب") : t("تم تفعيل الحساب"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not update account."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  if (!account) {
    return accountsStatus === "loading" ? <PageLoader label={t("Loading account...")} /> : <PageLoader label={t("Account not found")} />;
  }

  return (
    <div>
      <Link to="/accounts" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300">
        <FiArrowLeft /> {t("Back to Accounts")}
      </Link>

      <PageHeader
        title={account.name}
        description={`${t(account.type.charAt(0).toUpperCase() + account.type.slice(1))} · ${t("Opened")} ${new Date(account.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`}
        actions={
          <>
            <Button variant="outline" icon={FiEdit2} onClick={() => setAdjustOpen(true)}>
              {t("Adjust Balance")}
            </Button>
            <ArchiveAccountButton isArchived={!account.isActive} onClick={handleToggleArchive} />
          </>
        }
      />

      <Card className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Current Balance")}</span>
          <div className={`mt-2 text-4xl font-extrabold ${account.balance < 0 ? "text-red-400" : "text-slate-50"}`}>
            {formatCurrency(account.balance, account.currency)}
          </div>
        </div>
        {!account.isActive && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <FiSlash className="text-red-400" /> {t("Disabled accounts can't receive new transactions")}
          </div>
        )}
      </Card>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-bold text-slate-100">{t("Transaction History")}</h3>
        <DateRangeFilter from={range.from} to={range.to} onFromChange={(v) => setRange((r) => ({ ...r, from: v }))} onToChange={(v) => setRange((r) => ({ ...r, to: v }))} />
      </div>

      {loadingTxns ? (
        <PageLoader label={t("Loading transactions...")} />
      ) : (
        <AccountTransactionsList transactions={transactions} currency={account.currency} />
      )}

      <AdjustBalanceDialog open={adjustOpen} onClose={() => setAdjustOpen(false)} account={account} />
    </div>
  );
}
