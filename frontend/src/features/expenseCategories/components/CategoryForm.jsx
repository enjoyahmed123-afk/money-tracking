import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import ColorPicker from "@/features/expenseCategories/components/ColorPicker.jsx";
import { addExpenseCategory, editExpenseCategory } from "@/store/expenseCategorySlice";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  name: z.string().min(1, "Category name is required").max(50, "Name is too long"),
  color: z.string().min(1),
});

export default function CategoryForm({ category, onCancel, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isEditing = Boolean(category);
  const { status } = useSelector((state) => state.expenseCategory);
  const submitting = status === "loading";

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name ?? "",
      color: category?.color ?? "#2dd4bf",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await dispatch(editExpenseCategory({ id: category._id, data })).unwrap();
      } else {
        await dispatch(addExpenseCategory(data)).unwrap();
      }
      Swal.fire({
        icon: "success",
        title: isEditing ? t("تم تعديل التصنيف بنجاح") : t("تم إضافة التصنيف بنجاح"),
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
      <FormField label={t("Category Name")} required error={t(errors.name?.message)}>
        <Input placeholder="e.g. Subscriptions" {...register("name")} />
      </FormField>
      <FormField label={t("Color")}>
        <ColorPicker selected={watch("color")} onChange={(c) => setValue("color", c)} />
      </FormField>
      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? t("Saving...") : t("Save Category")}
        </Button>
      </div>
    </form>
  );
}
