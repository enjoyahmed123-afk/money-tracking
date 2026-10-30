import Spinner from "@/components/ui/Spinner.jsx";

export default function PageLoader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
      <Spinner size={32} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
