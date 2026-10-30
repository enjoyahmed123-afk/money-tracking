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
import { addDebt } from "@/store/debtSlice";
import { CURRENCIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  creditor: z.string().min(1, "Creditor name is required").max(100, "Name is too long"),
  totalAmount: z.coerce.number({ invalid_type_error: "Total amount is required" }).positive("Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Expected payoff date is required"),
  notes: z.string().max(500, "Notes are too long").optional().or(z.literal("")),
});

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function DebtForm({ onCancel, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.debt);
  const submitting = status === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { creditor: "", totalAmount: "", currency: "EGP", startDate: today(), dueDate: "", notes: "" },
  });

  const onSubmit = async (data) => {
    try {
      const { notes, ...rest } = data;
      await dispatch(addDebt({ ...rest, description: notes })).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم إضافة الدين بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
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
      <FormField label={t("Creditor Name")} required error={t(errors.creditor?.message)}>
        <Input placeholder="e.g. Ahmed Hassan" {...register("creditor")} />
      </FormField>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Total Amount")} required error={t(errors.totalAmount?.message)}>
          <Input type="number" step="0.01" placeholder="0.00" {...register("totalAmount")} />
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
        <FormField label={t("Date Originated")} required error={t(errors.startDate?.message)}>
          <Input type="date" {...register("startDate")} />
        </FormField>
        <FormField label={t("Expected Payoff Date")} required error={t(errors.dueDate?.message)}>
          <Input type="date" {...register("dueDate")} />
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
          {submitting ? t("Saving...") : t("Save Debt")}
        </Button>
      </div>
    </form>
  );
}
