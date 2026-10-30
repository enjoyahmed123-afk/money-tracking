import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategoryItem from "@/features/expenseCategories/components/CategoryItem.jsx";
import DeleteCategoryDialog from "@/features/expenseCategories/components/DeleteCategoryDialog.jsx";
import Modal from "@/components/ui/Modal.jsx";
import CategoryForm from "@/features/expenseCategories/components/CategoryForm.jsx";
import { removeExpenseCategory } from "@/store/expenseCategorySlice";
import { DEFAULT_EXPENSE_CATEGORIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function CategoryList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items: customCategories } = useSelector((state) => state.expenseCategory);
  const { items: expenses } = useSelector((state) => state.expense);

  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const countFor = (name) => expenses.filter((e) => e.category === name).length;

  const categories = [
    ...DEFAULT_EXPENSE_CATEGORIES.map((c) => ({ ...c, _id: `default-${c.name}`, isDefault: true, count: countFor(c.name) })),
    ...customCategories.map((c) => ({ ...c, isDefault: false, count: countFor(c.name) })),
  ];

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeExpenseCategory(deleteTarget._id)).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم حذف التصنيف بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not delete category."),
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
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onEdit={() => setEditTarget(category)}
            onDelete={() => setDeleteTarget(category)}
          />
        ))}
      </div>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title={t("Edit Category")} size="sm">
        <CategoryForm category={editTarget} onCancel={() => setEditTarget(null)} onSaved={() => setEditTarget(null)} />
      </Modal>

      <DeleteCategoryDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        categoryName={deleteTarget?.name}
      />
    </>
  );
}
