import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">الرئيسية</h1>
      <Card className="flex flex-col items-center gap-3 p-10 text-center">
        <p className="text-3xl">✅</p>
        <p className="text-lg font-semibold text-gray-900">تم تسجيل الدخول بنجاح</p>
        <p className="text-sm text-gray-500">أهلاً بيك يا {user?.name}</p>
      </Card>
    </div>
  );
}
