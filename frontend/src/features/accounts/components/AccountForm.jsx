import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Button from "@/components/ui/Button.jsx";
import ColorPicker from "@/features/expenseCategories/components/ColorPicker.jsx";
import { addAccount } from "@/store/accountSlice";
import { CURRENCIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  name: z.string().min(1, "Account name is required").max(100, "Name is too long"),
  type: z.enum(["bank", "wallet", "cash"]),
  currency: z.string().min(1),
  balance: z.coerce.number({ invalid_type_error: "Initial balance is required" }),
  color: z.string().min(1),
});

export default function AccountForm({ onCancel, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.account);
  const submitting = status === "loading";

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", type: "bank", currency: "EGP", balance: 0, color: "#0d9488" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(addAccount(data)).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم إضافة الحساب بنجاح"),
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
      <FormField label={t("Account Name")} required error={t(errors.name?.message)}>
        <Input placeholder="e.g. Main Bank" {...register("name")} />
      </FormField>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label={t("Type")} required error={t(errors.type?.message)}>
          <Select {...register("type")}>
            <option value="bank">{t("Bank")}</option>
            <option value="wallet">{t("Wallet")}</option>
            <option value="cash">{t("Cash")}</option>
          </Select>
        </FormField>
        <FormField label={t("Currency")} required error={t(errors.currency?.message)}>
          <Select {...register("currency")}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>
      </div>
      <FormField label={t("Initial Balance")} required error={t(errors.balance?.message)}>
        <Input type="number" step="0.01" placeholder="0.00" {...register("balance")} />
      </FormField>
      <FormField label={t("Color")}>
        <ColorPicker selected={watch("color")} onChange={(c) => setValue("color", c)} />
      </FormField>
      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? t("Saving...") : t("Save Account")}
        </Button>
      </div>
    </form>
  );
}
