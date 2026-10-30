import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
      <FiAlertTriangle className="shrink-0 text-base" />
      {message}
    </div>
  );
}
