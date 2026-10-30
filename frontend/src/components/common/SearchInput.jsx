import { FiSearch } from "react-icons/fi";
import Input from "@/components/ui/Input.jsx";

export default function SearchInput({ placeholder = "Search...", className = "", ...props }) {
  return <Input icon={FiSearch} placeholder={placeholder} className={className} {...props} />;
}
