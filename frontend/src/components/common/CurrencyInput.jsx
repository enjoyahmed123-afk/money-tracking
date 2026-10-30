
import Input from "@/components/ui/Input.jsx";

export default function CurrencyInput({ currency, className = "", children, ...props}) {
  return (
    <div className="relative flex">
      <Input type="number" step="0.01" placeholder="0.00" className={`pr-4 rounded-r-none ${className}`}{...props}/>
      {children}
    </div>
  );
}
