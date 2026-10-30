import { FiAlertCircle } from "react-icons/fi";

export default function AuthErrorAlert({ message = "Invalid email or password" }) {
  return (
    <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
      <FiAlertCircle className="shrink-0" />
      {message}
    </div>
  );
}
