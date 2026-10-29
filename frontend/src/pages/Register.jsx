import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { apiErrorMessage } from "../api/client";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/ui/Button";
import { FormField, Input } from "../components/ui/Field";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("كلمة السر وتأكيدها مش متطابقين");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err, "تعذر إنشاء الحساب"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="إنشاء حساب جديد" subtitle="خطوة واحدة وتبدأ تتابع فلوسك من دلوقتي.">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FormField label="الاسم" required>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="اسمك بالكامل"
          />
        </FormField>

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
            minLength={8}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="8 أحرف على الأقل"
          />
        </FormField>

        <FormField label="تأكيد كلمة السر" required>
          <Input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
            placeholder="••••••••"
          />
        </FormField>

        <Button type="submit" loading={loading} className="w-full">
          إنشاء الحساب
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        عندك حساب بالفعل؟{" "}
        <Link to="/login" className="font-semibold text-teal-600 hover:underline">
          سجّل دخول
        </Link>
      </p>
    </AuthLayout>
  );
}
