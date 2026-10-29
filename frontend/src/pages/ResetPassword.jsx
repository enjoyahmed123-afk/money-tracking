import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth";
import { apiErrorMessage } from "../api/client";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/ui/Button";
import { FormField, Input } from "../components/ui/Field";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("كلمة السر وتأكيدها مش متطابقين");
      return;
    }
    if (!token) {
      toast.error("اللينك ده مش صالح — اطلب لينك جديد");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      toast.success("تم تغيير كلمة السر بنجاح، سجّل دخول بكلمة السر الجديدة");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err, "اللينك غير صالح أو منتهي"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="تعيين كلمة سر جديدة" subtitle="اكتب كلمة السر الجديدة بتاعتك.">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {!token && (
          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
            اللينك ده ناقصه التوكن — افتحه من نفس اللينك اللي جالك في الإيميل.
          </p>
        )}

        <FormField label="كلمة السر الجديدة" required>
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 أحرف على الأقل"
          />
        </FormField>

        <FormField label="تأكيد كلمة السر" required>
          <Input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
        </FormField>

        <Button type="submit" loading={loading} className="w-full">
          حفظ كلمة السر الجديدة
        </Button>

        <p className="text-center text-sm text-gray-500">
          <Link to="/login" className="font-semibold text-teal-600 hover:underline">
            الرجوع لتسجيل الدخول
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
