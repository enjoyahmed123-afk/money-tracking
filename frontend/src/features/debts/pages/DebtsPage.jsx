import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FiAlertCircle, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Card from "@/components/ui/Card.jsx";
import Modal from "@/components/ui/Modal.jsx";
import Tabs from "@/components/ui/Tabs.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import DebtCard from "@/features/debts/components/DebtCard.jsx";
import DebtForm from "@/features/debts/components/DebtForm.jsx";
import MarkPaidDialog from "@/features/debts/components/MarkPaidDialog.jsx";
import { fetchDebts, markPaid } from "@/store/debtSlice";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DebtsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status } = useSelector((state) => state.debt);
  const [tab, setTab] = useState("active");
  const [formOpen, setFormOpen] = useState(false);
  const [markPaidTarget, setMarkPaidTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchDebts());
  }, [dispatch]);

  const active = items.filter((d) => d.status !== "paid");
  const completed = items.filter((d) => d.status === "paid");
  const shown = tab === "active" ? active : completed;

  const totalsByCurrency = {};
  for (const d of active) {
    totalsByCurrency[d.currency] = (totalsByCurrency[d.currency] ?? 0) + d.remainingAmount;
  }
  const currencies = Object.keys(totalsByCurrency);

  const nearestDue = active
    .filter((d) => d.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const handleMarkPaid = async () => {
    try {
      await dispatch(markPaid(markPaidTarget._id)).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم تسجيل الدين كمسدد"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not update debt."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setMarkPaidTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        icon={FiAlertCircle}
        title={t("Debts")}
        description={t("Stay ahead of what you owe and when it's due")}
        actions={
          <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
            {t("Add Debt")}
          </Button>
        }
      />

      <Card className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center bg-gradient-to-br from-amber-400/10 to-red-400/5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Total Remaining")}</span>
          {currencies.length <= 1 ? (
            <div className="mt-1 text-3xl font-extrabold text-slate-50">
              {currencies.length === 1 ? formatCurrency(totalsByCurrency[currencies[0]], currencies[0]) : formatCurrency(0)}
            </div>
          ) : (
            <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {currencies.map((c) => (
                <span key={c} className="text-2xl font-extrabold text-slate-50">{formatCurrency(totalsByCurrency[c], c)}</span>
              ))}
            </div>
          )}
        </div>
        {nearestDue && (
          <p className="text-xs text-slate-400">
            {t("Nearest due date")}:{" "}
            <span className={`font-bold ${nearestDue.status === "overdue" ? "text-red-400" : "text-amber-300"}`}>
              {new Date(nearestDue.dueDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              {nearestDue.status === "overdue" && ` (${t("overdue")})`}
            </span>
          </p>
        )}
      </Card>

      <div className="mb-5">
        <Tabs
          tabs={[
            { value: "active", label: `${t("Active")} (${active.length})` },
            { value: "completed", label: `${t("Completed")} (${completed.length})` },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {status === "loading" && items.length === 0 ? (
        <PageLoader label={t("Loading debts...")} />
      ) : shown.length === 0 ? (
        <EmptyState
          icon={FiAlertCircle}
          title={tab === "active" ? t("No active debts") : t("No completed debts yet")}
          description={tab === "active" ? t("Add a debt to start tracking what you owe.") : t("Debts you mark as paid will show up here.")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((debt) => (
            <DebtCard key={debt._id} debt={debt} onMarkPaid={() => setMarkPaidTarget(debt)} />
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={t("Add Debt")}>
        <DebtForm onCancel={() => setFormOpen(false)} onSaved={() => setFormOpen(false)} />
      </Modal>

      <MarkPaidDialog open={!!markPaidTarget} onClose={() => setMarkPaidTarget(null)} onConfirm={handleMarkPaid} />
    </div>
  );
}
