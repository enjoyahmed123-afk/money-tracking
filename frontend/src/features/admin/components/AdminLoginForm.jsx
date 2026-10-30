import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";

export default function AdminLoginForm() {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Admin Email" required>
        <Input icon={FiMail} type="email" placeholder="admin@moneyflow.app" />
      </FormField>
      <FormField label="Password" required>
        <Input icon={FiLock} type="password" placeholder="••••••••" />
      </FormField>
      <Button type="submit" fullWidth size="lg" iconRight={FiArrowRight}>
        Enter Admin Panel
      </Button>
    </form>
  );
}
