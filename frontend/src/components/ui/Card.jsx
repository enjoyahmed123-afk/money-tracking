export default function Card({ children, className = "", hover = false, padding = "p-6", as: As = "div", ...props }) {
  return (
    <As
      className={`glass-panel ${padding} ${hover ? "transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_56px_-28px_rgba(34,211,238,0.4)]" : ""} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
