import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiTag, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import CategoryForm from "@/features/expenseCategories/components/CategoryForm.jsx";
import CategoryList from "@/features/expenseCategories/components/CategoryList.jsx";
import { fetchExpenseCategories } from "@/store/expenseCategorySlice";
import { fetchExpenses } from "@/store/expenseSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function ExpenseCategoriesPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExpenseCategories());
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        icon={FiTag}
        title={t("Expense Categories")}
        description={t("Organize your spending with categories that fit your life")}
        actions={
          <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
            {t("New Category")}
          </Button>
        }
      />

      <CategoryList />

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={t("New Category")} size="sm">
        <CategoryForm onCancel={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
}
