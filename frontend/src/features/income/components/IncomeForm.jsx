import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import TextArea from "@/components/ui/TextArea.jsx";
import Button from "@/components/ui/Button.jsx";
import { addIncome, editIncome } from "@/store/incomeSlice";
import { CURRENCIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  name: z.string().min(1, "Source name is required").max(100, "Name is too long"),
  category: z.enum(["salary", "freelance", "rental", "investment", "other"]),
  amount: z.coerce.number({ invalid_type_error: "Amount is required" }).positive("Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  receivedDate: z.string().min(1, "Date received is required"),
  recurrence: z.enum(["once", "weekly", "monthly", "yearly"]),
  notes: z.string().max(500, "Notes are too long").optional().or(z.literal("")),
  accountId: z.string().optional(),
});

function toDateInputValue(date) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
}

export default function IncomeForm({ income, onCancel, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isEditing = Boolean(income);

  const { status } = useSelector((state) => state.income);
  const { items: allAccounts } = useSelector((state) => state.account);
  const submitting = status === "loading";

  // Archived accounts can't receive new transactions, so they're hidden here
  // unless this income is already linked to one (keeps existing edits intact).
  const accounts = allAccounts.filter((a) => a.isActive || a._id === income?.account);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: income?.name ?? "",
      category: income?.category ?? "salary",
      amount: income?.amount ?? "",
      currency: income?.currency ?? "EGP",
      receivedDate: toDateInputValue(income?.receivedDate),
      recurrence: income?.recurrence ?? "once",
      notes: income?.notes ?? "",
      accountId: income?.account ?? "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await dispatch(
          editIncome({
            id: income._id,
            data: { ...data, isActive: income.isActive, accountId: data.accountId || undefined },
          })
        ).unwrap();
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
        await dispatch(addIncome(data)).unwrap();
        Swal.fire({
          icon: "success",
          title: t("تم إضافة مصدر الدخل بنجاح"),
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
      <FormField label={t("Source Name")} required error={t(errors.name?.message)}>
        <Input placeholder="e.g. Monthly Salary" {...register("name")} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Type")} required error={t(errors.category?.message)}>
          <Select {...register("category")}>
            <option value="salary">{t("Salary")}</option>
            <option value="freelance">{t("Freelance")}</option>
            <option value="rental">{t("Rent")}</option>
            <option value="investment">{t("Profit")}</option>
            <option value="other">{t("Other")}</option>
          </Select>
        </FormField>
        <FormField label={t("Recurrence")} required error={t(errors.recurrence?.message)}>
          <Select {...register("recurrence")}>
            <option value="once">{t("Once")}</option>
            <option value="weekly">{t("Weekly")}</option>
            <option value="monthly">{t("Monthly")}</option>
            <option value="yearly">{t("Yearly")}</option>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Amount")} required error={t(errors.amount?.message)}>
          <Input type="number" step="0.01" placeholder="0.00" {...register("amount")} />
        </FormField>
        <FormField label={t("Currency")} required error={t(errors.currency?.message)}>
          <Select {...register("currency")}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Date Received")} required error={t(errors.receivedDate?.message)}>
          <Input type="date" {...register("receivedDate")} />
        </FormField>
        <FormField label={t("Account (optional)")} error={t(errors.accountId?.message)}>
          <Select {...register("accountId")}>
            <option value="">{t("None")}</option>
            {accounts.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label={t("Notes")}>
        <TextArea placeholder={t("Optional notes...")} {...register("notes")} />
      </FormField>

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? t("Saving...") : t("Save Income")}
        </Button>
      </div>
    </form>
  );
}
