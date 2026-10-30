import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FiTrendingUp, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import Card from "@/components/ui/Card.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import ErrorMessage from "@/components/common/ErrorMessage.jsx";
import IncomeSummaryCard from "@/features/income/components/IncomeSummaryCard.jsx";
import IncomeFilters from "@/features/income/components/IncomeFilters.jsx";
import IncomeForm from "@/features/income/components/IncomeForm.jsx";
import IncomeList from "@/features/income/components/IncomeList.jsx";
import DeleteIncomeDialog from "@/features/income/components/DeleteIncomeDialog.jsx";
import { fetchIncomes, editIncome, removeIncome } from "@/store/incomeSlice";
import { fetchAccounts } from "@/store/accountSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function IncomePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status, error } = useSelector((state) => state.income);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7),
    category: "all",
    recurrence: "all",
    search: "",
  });
  const [year, month] = filters.month.split("-").map(Number);

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const openAddForm = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEditForm = (income) => {
    setEditTarget(income);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleToggleActive = async (income) => {
    try {
      await dispatch(
        editIncome({
          id: income._id,
          data: {
            name: income.name,
            category: income.category,
            amount: income.amount,
            currency: income.currency,
            receivedDate: income.receivedDate,
            recurrence: income.recurrence,
            status: income.status,
            notes: income.notes,
            accountId: income.account || undefined,
            isActive: !income.isActive,
          },
        })
      ).unwrap();
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not update income."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeIncome(deleteTarget._id)).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم الحذف بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not delete income."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        icon={FiTrendingUp}
        title={t("Income")}
        description={t("Every source of money coming in, organized in one place")}
        actions={
          <Button icon={FiPlus} onClick={openAddForm}>
            {t("Add Income")}
          </Button>
        }
      />

      <div className="mb-6">
        <IncomeSummaryCard
          period={{ year, month: month - 1 }}
          onPeriodChange={({ year: nextYear, month: nextMonth }) =>
            setFilters((current) => ({
              ...current,
              month: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}`,
            }))
          }
        />
      </div>

      <Card padding="p-5" className="mb-5">
        <IncomeFilters filters={filters} onChange={setFilters} />
      </Card>

      {status === "loading" && items.length === 0 ? (
        <PageLoader label={t("Loading income sources...")} />
      ) : error && items.length === 0 ? (
        <ErrorMessage message={t(error)} />
      ) : (
        <IncomeList
          filters={filters}
          onEdit={openEditForm}
          onDelete={setDeleteTarget}
          onToggleActive={handleToggleActive}
        />
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editTarget ? t("Edit Income Source") : t("Add Income Source")}
        description={t("Fill in the details below")}
      >
        <IncomeForm income={editTarget} onCancel={closeForm} onSaved={closeForm} />
      </Modal>

      <DeleteIncomeDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        incomeName={deleteTarget?.name}
      />
    </div>
  );
}
