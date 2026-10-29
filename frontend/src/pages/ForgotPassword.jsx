import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../api/auth";
import { apiErrorMessage } from "../api/client";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/ui/Button";
import { FormField, Input } from "../components/ui/Field";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="نسيت كلمة السر؟"
      subtitle="اكتب إيميلك وهنبعتلك لينك تقدر بيه تعمل كلمة سر جديدة."
    >
      {sent ? (
        <div className="space-y-4 rounded-2xl border border-teal-100 bg-teal-50 p-6 text-center">
          <p className="text-3xl">📬</p>
          <p className="text-sm leading-relaxed text-teal-800">
            لو الإيميل ده مسجّل عندنا، هيوصلك لينك لإعادة تعيين كلمة السر خلال دقايق.
            اللينك صالح لمدة 24 ساعة بس.
          </p>
          <Link to="/login" className="inline-block text-sm font-semibold text-teal-700 hover:underline">
            الرجوع لتسجيل الدخول
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <FormField label="الإيميل" required>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </FormField>

          <Button type="submit" loading={loading} className="w-full">
            إرسال لينك إعادة التعيين
          </Button>

          <p className="text-center text-sm text-gray-500">
            افتكرت كلمة السر؟{" "}
            <Link to="/login" className="font-semibold text-teal-600 hover:underline">
              سجّل دخول
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
