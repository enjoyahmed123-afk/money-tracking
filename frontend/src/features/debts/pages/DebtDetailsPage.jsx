import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FiArrowLeft, FiPlus, FiCheckCircle } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import DebtProgressBar from "@/features/debts/components/DebtProgressBar.jsx";
import PaymentsList from "@/features/debts/components/PaymentsList.jsx";
import AddPaymentDialog from "@/features/debts/components/AddPaymentDialog.jsx";
import MarkPaidDialog from "@/features/debts/components/MarkPaidDialog.jsx";
import { fetchDebts, markPaid } from "@/store/debtSlice";
import { getDebtPayments } from "@/api/debts.api";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

// Estimates a payoff date from the average monthly payment rate seen so far.
// Needs at least 2 payments spread over time to mean anything.
function predictPayoff(debt, payments) {
  if (payments.length < 2) return null;
  const dates = payments.map((p) => new Date(p.date)).sort((a, b) => a - b);
  const earliest = dates[0];
  const now = new Date();
  const monthsSpan = Math.max(1, (now.getFullYear() - earliest.getFullYear()) * 12 + (now.getMonth() - earliest.getMonth()) + 1);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const avgMonthly = totalPaid / monthsSpan;
  if (avgMonthly <= 0) return null;

  const remaining = debt.remainingAmount;
  if (remaining <= 0) return { payoffDate: now };

  const monthsRemaining = Math.ceil(remaining / avgMonthly);
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + monthsRemaining, now.getDate());
  return { payoffDate };
}

export default function DebtDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status } = useSelector((state) => state.debt);
  const debt = items.find((d) => d._id === id);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [markPaidOpen, setMarkPaidOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchDebts());
  }, [dispatch, items.length]);

  const loadPayments = () => {
    setLoadingPayments(true);
    getDebtPayments(id)
      .then((res) => setPayments(res.data.data))
      .catch(() => setPayments([]))
      .finally(() => setLoadingPayments(false));
  };

  useEffect(loadPayments, [id]);

  const handleMarkPaid = async () => {
    try {
      await dispatch(markPaid(debt._id)).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم تسجيل الدين كمسدد"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/debts");
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
      setMarkPaidOpen(false);
    }
  };

  if (!debt) {
    return status === "loading" ? <PageLoader label={t("Loading debt...")} /> : <PageLoader label={t("Debt not found")} />;
  }

  const prediction = predictPayoff(debt, payments);

  return (
    <div>
      <Link to="/debts" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300">
        <FiArrowLeft /> {t("Back to Debts")}
      </Link>

      <PageHeader
        title={debt.creditor}
        description={
          debt.status === "paid"
            ? t("This debt is fully paid off")
            : prediction
              ? `${t("Based on your payment rate, you'll pay this off around")} ${prediction.payoffDate.toLocaleDateString(undefined, { year: "numeric", month: "long" })}`
              : t("أضف دفعات أكثر لحساب التوقع")
        }
        actions={
          debt.status !== "paid" && (
            <>
              <Button variant="outline" icon={FiCheckCircle} onClick={() => setMarkPaidOpen(true)}>
                {t("Mark as Paid")}
              </Button>
              <Button icon={FiPlus} onClick={() => setPaymentOpen(true)}>
                {t("Add Payment")}
              </Button>
            </>
          )
        }
      />

      <Card className="mb-6">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Original Amount")}</span>
            <div className="mt-1 text-2xl font-extrabold text-slate-50">{formatCurrency(debt.totalAmount, debt.currency)}</div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Total Paid")}</span>
            <div className="mt-1 text-2xl font-extrabold text-emerald-400">{formatCurrency(debt.paidAmount, debt.currency)}</div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Remaining")}</span>
            <div className="mt-1 text-2xl font-extrabold text-amber-300">{formatCurrency(debt.remainingAmount, debt.currency)}</div>
          </div>
        </div>
        <DebtProgressBar paid={debt.paidAmount} total={debt.totalAmount} currency={debt.currency} />
      </Card>

      <h3 className="mb-4 font-bold text-slate-100">{t("Payment History")}</h3>
      {loadingPayments ? <PageLoader label={t("Loading payments...")} /> : <PaymentsList payments={payments} currency={debt.currency} />}

      <AddPaymentDialog open={paymentOpen} onClose={() => setPaymentOpen(false)} debt={debt} onSaved={loadPayments} />
      <MarkPaidDialog open={markPaidOpen} onClose={() => setMarkPaidOpen(false)} onConfirm={handleMarkPaid} />
    </div>
  );
}
