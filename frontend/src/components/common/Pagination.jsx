import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/5 disabled:opacity-40"
      >
        <FiChevronLeft />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange?.(p)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
            p === page
              ? "bg-gradient-to-br from-teal-400 to-indigo-500 text-onaccent shadow-btn"
              : "border border-white/10 text-slate-300 hover:bg-white/5"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/5 disabled:opacity-40"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
