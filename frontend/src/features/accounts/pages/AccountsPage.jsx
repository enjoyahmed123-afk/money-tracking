import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FiCreditCard, FiPlus, FiRepeat } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Card from "@/components/ui/Card.jsx";
import Modal from "@/components/ui/Modal.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import AccountCard from "@/features/accounts/components/AccountCard.jsx";
import AccountForm from "@/features/accounts/components/AccountForm.jsx";
import AdjustBalanceDialog from "@/features/accounts/components/AdjustBalanceDialog.jsx";
import TransferDialog from "@/features/accounts/components/TransferDialog.jsx";
import { fetchAccounts, toggleArchive } from "@/store/accountSlice";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function AccountsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status } = useSelector((state) => state.account);
  const [formOpen, setFormOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [adjustTarget, setAdjustTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const accounts = items.map((a) => ({
    ...a,
    id: a._id,
    type: a.type.charAt(0).toUpperCase() + a.type.slice(1),
  }));
  const activeAccounts = accounts.filter((a) => a.isActive);
  const archivedAccounts = accounts.filter((a) => !a.isActive);

  const totalsByCurrency = {};
  for (const a of activeAccounts) {
    totalsByCurrency[a.currency] = (totalsByCurrency[a.currency] ?? 0) + a.balance;
  }
  const currencies = Object.keys(totalsByCurrency);

  const handleToggleArchive = async (account) => {
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

  return (
    <div>
      <PageHeader
        icon={FiCreditCard}
        title={t("Accounts")}
        description={t("Every bank, wallet, and cash stash — all in one view")}
        actions={
          <>
            <Button variant="outline" icon={FiRepeat} onClick={() => setTransferOpen(true)}>
              {t("Transfer")}
            </Button>
            <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
              {t("Add Account")}
            </Button>
          </>
        }
      />

      <Card className="mb-6 bg-gradient-to-br from-teal-400/10 to-indigo-500/10">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Total Net Worth")}</span>
        {currencies.length <= 1 ? (
          <div className={`mt-2 text-4xl font-extrabold ${(totalsByCurrency[currencies[0]] ?? 0) < 0 ? "text-red-400" : "text-slate-50"}`}>
            {currencies.length === 1 ? formatCurrency(totalsByCurrency[currencies[0]], currencies[0]) : formatCurrency(0)}
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            {currencies.map((c) => (
              <span key={c} className={`text-3xl font-extrabold ${totalsByCurrency[c] < 0 ? "text-red-400" : "text-slate-50"}`}>
                {formatCurrency(totalsByCurrency[c], c)}
              </span>
            ))}
          </div>
        )}
      </Card>

      {status === "loading" && accounts.length === 0 ? (
        <PageLoader label={t("Loading accounts...")} />
      ) : accounts.length === 0 ? (
        <EmptyState
          icon={FiCreditCard}
          title={t("No accounts yet")}
          description={t("Add a bank, wallet, or cash account to start linking your income and expenses to it.")}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {activeAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onAdjustBalance={() => setAdjustTarget(account)}
                onToggleArchive={() => handleToggleArchive(account)}
              />
            ))}
          </div>

          {archivedAccounts.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">{t("Archived Accounts")}</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {archivedAccounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onAdjustBalance={() => setAdjustTarget(account)}
                    onToggleArchive={() => handleToggleArchive(account)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={t("Add Account")}>
        <AccountForm onCancel={() => setFormOpen(false)} onSaved={() => setFormOpen(false)} />
      </Modal>
      <TransferDialog open={transferOpen} onClose={() => setTransferOpen(false)} />
      <AdjustBalanceDialog open={!!adjustTarget} onClose={() => setAdjustTarget(null)} account={adjustTarget} />
    </div>
  );
}
