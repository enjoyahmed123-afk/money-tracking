import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Button from "@/components/ui/Button.jsx";
import { addExpense, editExpense } from "@/store/expenseSlice";
import { addExpenseCategory } from "@/store/expenseCategorySlice";
import { DEFAULT_EXPENSE_CATEGORIES, EXPENSE_TYPES, PAYMENT_METHODS } from "@/config/constants.js";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const NEW_CATEGORY = "__new__";

const schema = z.object({
  amount: z.coerce.number({ invalid_type_error: "Amount is required" }).positive("Amount must be greater than 0"),
  description: z.string().min(1, "Description is required").max(200, "Description is too long"),
  date: z.string().min(1, "Date is required"),
  paymentMethod: z.enum(["cash", "card", "wallet"]),
  expenseType: z.enum(["daily", "fixed", "emergency"]),
  category: z.string().min(1, "Category is required").refine((v) => v !== NEW_CATEGORY, "Pick or create a category"),
  accountId: z.string().min(1, "Account is required"),
});

function toDateInputValue(date) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
}

export default function ExpenseForm({ expense, onCancel, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isEditing = Boolean(expense);

  const { status } = useSelector((state) => state.expense);
  const { items: customCategories } = useSelector((state) => state.expenseCategory);
  const { items: allAccounts } = useSelector((state) => state.account);
  const submitting = status === "loading";

  // Archived accounts can't receive new transactions, so they're hidden here.
  // If editing an expense already linked to an archived account, keep it selectable
  // so the existing link isn't silently broken.
  const accounts = allAccounts.filter((a) => a.isActive || a._id === expense?.account);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: expense?.amount ?? "",
      description: expense?.description ?? "",
      date: toDateInputValue(expense?.date),
      paymentMethod: expense?.paymentMethod ?? "cash",
      expenseType: expense?.expenseType ?? "daily",
      category: expense?.category ?? DEFAULT_EXPENSE_CATEGORIES[0].name,
      accountId: expense?.account ?? (accounts[0]?._id ?? ""),
    },
  });

  const categoryValue = watch("category");
  const watchedAmount = watch("amount");
  const watchedAccountId = watch("accountId");
  const selectedAccount = accounts.find((a) => a._id === watchedAccountId);
  const insufficientBalance =
    selectedAccount && Number(watchedAmount) > selectedAccount.balance;

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === NEW_CATEGORY) {
      setAddingCategory(true);
      return;
    }
    setValue("category", value);
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const created = await dispatch(addExpenseCategory({ name: newCategoryName.trim(), color: "#2dd4bf" })).unwrap();
      setValue("category", created.name);
      setAddingCategory(false);
      setNewCategoryName("");
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not create category."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await dispatch(editExpense({ id: expense._id, data })).unwrap();
        Swal.fire({
          icon: "success",
          title: t("تم التعديل بنجاح"),
          toast: true,
          position: "bottom-start",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        await dispatch(addExpense(data)).unwrap();
        Swal.fire({
          icon: "success",
          title: t("تم تسجيل المصروف بنجاح"),
          toast: true,
          position: "bottom-start",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      onSaved?.();
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Something went wrong."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Amount")} required error={t(errors.amount?.message)}>
          <Input type="number" step="0.01" placeholder="0.00" {...register("amount")} />
        </FormField>
        <FormField label={t("Date")} required error={t(errors.date?.message)}>
          <Input type="date" {...register("date")} />
        </FormField>
      </div>

      <FormField label={t("Description")} required error={t(errors.description?.message)}>
        <Input placeholder="e.g. Weekly groceries" {...register("description")} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Payment Type")} required error={t(errors.paymentMethod?.message)}>
          <Select {...register("paymentMethod")}>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>{t(m[0].toUpperCase() + m.slice(1))}</option>
            ))}
          </Select>
        </FormField>
        <FormField label={t("Account")} required error={t(errors.accountId?.message)}>
          <Select {...register("accountId")}>
            {accounts.length === 0 && <option value="">{t("No accounts yet")}</option>}
            {accounts.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Expense Nature")} required error={t(errors.expenseType?.message)}>
          <Select {...register("expenseType")}>
            {EXPENSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{t(type.label)}</option>
            ))}
          </Select>
        </FormField>
        <FormField label={t("Category")} required error={t(errors.category?.message)}>
          <Select value={addingCategory ? NEW_CATEGORY : categoryValue} onChange={handleCategoryChange}>
            {DEFAULT_EXPENSE_CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{t(c.name)}</option>
            ))}
            {customCategories.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
            <option value={NEW_CATEGORY}>{t("+ Add new category...")}</option>
          </Select>
        </FormField>
      </div>

      {insufficientBalance && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-300">
          {t('الرصيد غير كافٍ — رصيد "{name}" الحالي هو {amount}. تقدر تكمل، بس الحساب هيبقى بالسالب.')
            .replace("{name}", selectedAccount.name)
            .replace("{amount}", formatCurrency(selectedAccount.balance, selectedAccount.currency))}
        </div>
      )}

      {addingCategory && (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <Input
            placeholder={t("New category name")}
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1"
          />
          <Button type="button" size="sm" onClick={handleCreateCategory}>{t("Add")}</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => { setAddingCategory(false); setNewCategoryName(""); }}>
            {t("Cancel")}
          </Button>
        </div>
      )}

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? t("Saving...") : t("Save Expense")}
        </Button>
      </div>
    </form>
  );
}
