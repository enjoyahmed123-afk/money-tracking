const COLORS = ["#2dd4bf", "#6366f1", "#22d3ee", "#fbbf24", "#f87171", "#34d399", "#a78bfa", "#fb923c"];

export default function ColorPicker({ selected = COLORS[0], onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange?.(color)}
          className={`h-8 w-8 rounded-full border-2 transition ${selected === color ? "border-white" : "border-transparent"}`}
          style={{ background: color }}
        />
      ))}
    </div>
  );
}
