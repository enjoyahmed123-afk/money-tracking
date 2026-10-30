import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiUserPlus, 
  FiMail, 
  FiLock, 
  FiUser, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff 
} from "react-icons/fi"; // 1. أُضيفت FiEye و FiEyeOff
import AuthCard from "@/features/auth/components/AuthCard.jsx";
import PasswordStrengthIndicator from "@/features/auth/components/PasswordStrengthIndicator.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { registerUser } from "@/store/authSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [secret, setSecret] = useState(true); // 2. تصحيح setSecret

  const { status } = useSelector((state) => state.auth);
  const submitting = status === "loading";

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  // لمراقبة قيمة الباسورد وتمرير طولها لمؤشر قوة الباسورد
  const watchPassword = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      Swal.fire({
        icon: 'success',
        title: t("Account created successfully"),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      navigate('/');
    } catch (errMessage) {
      console.log(errMessage);
      Swal.fire({
        icon: 'error',
        title: errMessage || t("Account creation failed."),
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <AuthCard icon={FiUserPlus} title={t("Create your account")} description={t("Start tracking your money in minutes")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Full Name Field */}
        <FormField label={t("Full Name")}>
          <Input
            icon={FiUser}
            placeholder="Sara Ahmed"
            type="text"
            {...register("name")}
          />
          {/* رسالة الخطأ الخاص بـ Zod */}
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{t(errors.name.message)}</p>
          )}
        </FormField>

        {/* Email Field */}
        <FormField label={t("Email")}>
          <Input
            icon={FiMail}
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          {/* رسالة الخطأ الخاص بـ Zod */}
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{t(errors.email.message)}</p>
          )}
        </FormField>

        {/* Password Field */}
        <FormField label={t("Password")}>
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
          
          {/* رسالة الخطأ الخاص بـ Zod */}
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{t(errors.password.message)}</p>
          )}

          {/* مؤشر قوة الباسورد */}
          <div className="mt-2">
            <PasswordStrengthIndicator strength={watchPassword.length > 8 ? 3 : watchPassword.length >= 6 ? 2 : 1} />
          </div>
        </FormField>

        <label className="flex items-start gap-2.5 text-xs text-slate-400">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-teal-400" />
          {t("I agree to the Terms of Service and Privacy Policy")}
        </label>

        <Button
          type="submit"
          fullWidth
          size="lg"
          iconRight={FiArrowRight}
          disabled={submitting}
        >
          {submitting ? t("Creating Account...") : t("Sign Up")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        {t("Already have an account?")}{" "}
        <Link to="/login" className="font-semibold text-teal-300 hover:text-teal-200">
          {t("Log in")}
        </Link>
      </p>
    </AuthCard>
  );
}