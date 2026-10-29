import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { apiErrorMessage } from "../api/client";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/ui/Button";
import { FormField, Input } from "../components/ui/Field";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password, form.rememberMe);
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err, "بيانات الدخول غير صحيحة"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="تسجيل الدخول" subtitle="أهلاً بيك تاني! سجّل دخولك عشان تكمل متابعة فلوسك.">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FormField label="الإيميل" required>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="example@email.com"
          />
        </FormField>

        <FormField label="كلمة السر" required>
          <Input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
          />
        </FormField>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(e) => setForm((f) => ({ ...f, rememberMe: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            فضّل تسجيل دخولي
          </label>
          <Link to="/forgot-password" className="font-medium text-teal-600 hover:underline">
            نسيت كلمة السر؟
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          دخول
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        مفيش حساب؟{" "}
        <Link to="/register" className="font-semibold text-teal-600 hover:underline">
          اعمل حساب جديد
        </Link>
      </p>
    </AuthLayout>
  );
}
