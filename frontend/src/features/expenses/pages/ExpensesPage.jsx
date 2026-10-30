import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTrendingDown, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import Card from "@/components/ui/Card.jsx";
import PageLoader from "@/components/common/PageLoader.jsx";
import ErrorMessage from "@/components/common/ErrorMessage.jsx";
import ExpenseSummaryCard from "@/features/expenses/components/ExpenseSummaryCard.jsx";
import ExpenseFilters from "@/features/expenses/components/ExpenseFilters.jsx";
import ExpenseForm from "@/features/expenses/components/ExpenseForm.jsx";
import ExpenseList from "@/features/expenses/components/ExpenseList.jsx";
import DeleteExpenseDialog from "@/features/expenses/components/DeleteExpenseDialog.jsx";
import { fetchExpenses, removeExpense } from "@/store/expenseSlice";
import { fetchExpenseCategories } from "@/store/expenseCategorySlice";
import { fetchAccounts } from "@/store/accountSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

const DEFAULT_FILTERS = { search: "", period: "all", expenseType: "all", category: "all", accountId: "all", from: "", to: "" };

export default function ExpensesPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status, error } = useSelector((state) => state.expense);

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filters, setFilters] = useState(
    categoryFromUrl ? { ...DEFAULT_FILTERS, category: categoryFromUrl } : DEFAULT_FILTERS
  );

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchExpenseCategories());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const openAddForm = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEditForm = (expense) => {
    setEditTarget(expense);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeExpense(deleteTarget._id)).unwrap();
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
        title: errMessage || t("Could not delete expense."),
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
        icon={FiTrendingDown}
        title={t("Expenses")}
        description={t("See exactly where your money goes, expense by expense")}
        actions={
          <Button icon={FiPlus} onClick={openAddForm}>
            {t("Add Expense")}
          </Button>
        }
      />

      <div className="mb-6">
        <ExpenseSummaryCard filters={filters} />
      </div>

      <Card padding="p-5" className="mb-5">
        <ExpenseFilters filters={filters} onChange={setFilters} />
      </Card>

      {status === "loading" && items.length === 0 ? (
        <PageLoader label={t("Loading expenses...")} />
      ) : error && items.length === 0 ? (
        <ErrorMessage message={t(error)} />
      ) : (
        <ExpenseList filters={filters} onEdit={openEditForm} onDelete={setDeleteTarget} />
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editTarget ? t("Edit Expense") : t("Add Expense")}
        description={t("Fill in the details below")}
        size="lg"
      >
        <ExpenseForm expense={editTarget} onCancel={closeForm} onSaved={closeForm} />
      </Modal>

      <DeleteExpenseDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        expenseName={deleteTarget?.description}
      />
    </div>
  );
}
