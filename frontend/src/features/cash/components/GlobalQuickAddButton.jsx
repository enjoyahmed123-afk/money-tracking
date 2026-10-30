import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiZap } from "react-icons/fi";
import Modal from "@/components/ui/Modal.jsx";
import QuickAddCashForm from "@/features/cash/components/QuickAddCashForm.jsx";
import { fetchAccounts } from "@/store/accountSlice";
import { fetchExpenseCategories } from "@/store/expenseCategorySlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function GlobalQuickAddButton() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchExpenseCategories());
  }, [dispatch]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={t("Quick Add Cash Expense")}
        className="fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-red-400 text-2xl text-onaccent shadow-btn transition hover:brightness-110 lg:bottom-8"
      >
        <FiZap />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={t("Quick Add Cash Expense")} description={t("Amount and category — that's it")} size="sm">
        <QuickAddCashForm onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
