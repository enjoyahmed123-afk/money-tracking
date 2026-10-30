import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import AuthCard from "@/features/auth/components/AuthCard.jsx";
import RememberMeCheckbox from "@/features/auth/components/RememberMeCheckbox.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import z from "zod";
import Swal from "sweetalert2";
import { loginUser } from "@/store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().default(false)
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [secret, setSecret] = useState(true);

  const { status } = useSelector((state) => state.auth);
  const submitting = status === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      Swal.fire({
        icon: 'success',
        title: t("Logged in"),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      navigate('/');
    } catch (errMessage) {
      Swal.fire({
        icon: 'error',
        title: errMessage || t("Login failed."),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <AuthCard icon={FiLock} title={t("Welcome back")} description={t("Log in to keep tracking your finances")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Email Field */}
        <FormField label={t("Email")} required>
          <Input
            icon={FiMail}
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {/* رسالة الخطأ الخاصة بـ Zod */}
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{t(errors.email.message)}</p>
          )}
        </FormField>

        {/* Password Field */}
        <FormField label={t("Password")} required>
          <div className="relative">
            <Input 
              icon={FiLock} 
              type={secret ? "password" : "text"} 
              placeholder="••••••••"
              {...register("password")}
            />
            <button 
              type="button" 
              onClick={() => setSecret(!secret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {secret ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
            </button>
          </div>
          {/* رسالة الخطأ الخاصة بـ Zod */}
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{t(errors.password.message)}</p>
          )}
        </FormField>

        <div className="flex items-center justify-between">
          <RememberMeCheckbox {...register("rememberMe")} />
          <Link to="/forgot-password" className="text-sm font-semibold text-teal-300 hover:text-teal-200">
            {t("Forgot password?")}
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          iconRight={FiArrowRight}
          disabled={submitting}
        >
          {submitting ? t("Logging in...") : t("Log In")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        {t("Don't have an account?")}{" "}
        <Link to="/register" className="font-semibold text-teal-300 hover:text-teal-200">
          {t("Sign up")}
        </Link>
      </p>
    </AuthCard>
  );
}