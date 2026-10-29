export default function Spinner({ full = false }) {
  const spinner = (
    <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
  );
  if (!full) return spinner;
  return <div className="flex h-full min-h-[200px] w-full items-center justify-center py-16">{spinner}</div>;
}
