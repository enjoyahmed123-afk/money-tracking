import { useState } from "react";
import { Link } from "react-router-dom";
import { FiKey, FiMail, FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import AuthCard from "@/features/auth/components/AuthCard.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import z from "zod";
import Swal from "sweetalert2";
import { forgotPasswordUser } from "@/store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const { status } = useSelector((state) => state.auth);
  const submitting = status === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = async (data) => {
    try {
      const message = await dispatch(forgotPasswordUser(data.email)).unwrap();
      Swal.fire({
        icon: 'success',
        title: t(message) || t("Reset link sent"),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      setSent(true);
    } catch (errMessage) {
      Swal.fire({
        icon: 'error',
        title: errMessage || t("Something went wrong."),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <AuthCard
      icon={FiKey}
      title={t("Forgot your password?")}
      description={t("Enter your email and we'll send a reset link valid for 24 hours")}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <FiCheckCircle className="h-10 w-10 text-teal-300" />
          <p className="text-sm text-slate-300">
            {t("If this email exists, a reset link has been sent. Check your inbox.")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField label={t("Email")} required>
            <Input
              icon={FiMail}
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{t(errors.email.message)}</p>
            )}
          </FormField>

          <Button type="submit" fullWidth size="lg" iconRight={FiArrowRight} disabled={submitting}>
            {submitting ? t("Sending...") : t("Send Reset Link")}
          </Button>
        </form>
      )}

      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300"
      >
        <FiArrowLeft /> {t("Back to Log In")}
      </Link>
    </AuthCard>
  );
}
