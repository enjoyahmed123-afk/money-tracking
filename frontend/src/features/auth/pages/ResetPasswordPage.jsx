import { useNavigate, useSearchParams } from "react-router-dom";
import { FiRefreshCw, FiLock, FiArrowRight } from "react-icons/fi";
import AuthCard from "@/features/auth/components/AuthCard.jsx";
import PasswordStrengthIndicator from "@/features/auth/components/PasswordStrengthIndicator.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import z from "zod";
import Swal from "sweetalert2";
import { resetPasswordUser } from "@/store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { status } = useSelector((state) => state.auth);
  const submitting = status === "loading";

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const watchPassword = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const message = await dispatch(resetPasswordUser({ token, password: data.password })).unwrap();
      Swal.fire({
        icon: 'success',
        title: t(message) || t("Password reset successfully"),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      navigate('/login');
    } catch (errMessage) {
      Swal.fire({
        icon: 'error',
        title: errMessage || t("Reset link is invalid or expired."),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <AuthCard icon={FiRefreshCw} title={t("Set a new password")} description={t("Choose a strong password for your account")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField label={t("New Password")} required>
          <Input icon={FiLock} type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{t(errors.password.message)}</p>
          )}
          <PasswordStrengthIndicator strength={watchPassword.length > 8 ? 3 : watchPassword.length >= 6 ? 2 : 1} />
        </FormField>

        <FormField label={t("Confirm New Password")} required>
          <Input icon={FiLock} type="password" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{t(errors.confirmPassword.message)}</p>
          )}
        </FormField>

        <Button type="submit" fullWidth size="lg" iconRight={FiArrowRight} disabled={submitting || !token}>
          {submitting ? t("Resetting...") : t("Reset Password")}
        </Button>

        {!token && (
          <p className="text-center text-xs text-red-400">
            {t("This reset link is missing or invalid. Please request a new one.")}
          </p>
        )}
      </form>
    </AuthCard>
  );
}
