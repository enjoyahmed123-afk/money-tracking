import Card from "@/components/ui/Card.jsx";

export default function ReportCard({ title, description, children, className = "" }) {
  return (
    <Card className={className}>
      {title && (
        <div className="mb-5">
          <h3 className="font-bold text-slate-100">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </Card>
  );
}
