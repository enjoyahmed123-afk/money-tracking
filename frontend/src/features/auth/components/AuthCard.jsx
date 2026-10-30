import Card from "@/components/ui/Card.jsx";

export default function AuthCard({ icon: Icon, title, description, children }) {
  return (
    <Card className="px-7 py-9 sm:px-9">
      <div className="mb-7 text-center">
        {Icon && (
          <div className="mx-auto mb-4 grid h-14 w-14 -rotate-6 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 text-2xl text-[#fff] shadow-btn">
            <Icon />
          </div>
        )}
        <h2 className="text-xl font-extrabold text-slate-50">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-slate-400">{description}</p>}
      </div>
      {children}
    </Card>
  );
}
