import Card from "@/components/ui/Card.jsx";
import ProgressBar from "@/components/ui/ProgressBar.jsx";

const STAGES = [
  { label: "Visitors", value: 100, color: "indigo" },
  { label: "Signed Up", value: 62, color: "teal" },
  { label: "Started Trial", value: 41, color: "teal" },
  { label: "Converted to Paid", value: 18, color: "emerald" },
];

export default function ConversionFunnel() {
  return (
    <Card>
      <h3 className="mb-5 font-bold text-slate-100">Conversion Funnel</h3>
      <div className="flex flex-col gap-4">
        {STAGES.map((s) => (
          <div key={s.label}>
            <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-400">
              <span>{s.label}</span>
              <span>{s.value}%</span>
            </div>
            <ProgressBar value={s.value} color={s.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}
