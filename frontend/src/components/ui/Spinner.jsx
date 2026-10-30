export default function Spinner({ size = 22, className = "" }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-white/15 border-t-teal-400 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
