import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import PasswordStrengthIndicator from "@/features/auth/components/PasswordStrengthIndicator.jsx";

export default function PasswordChangeForm() {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Current Password" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>
      <FormField label="New Password" required>
        <Input type="password" placeholder="••••••••" />
        <PasswordStrengthIndicator strength={2} />
      </FormField>
      <FormField label="Confirm New Password" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit">Update Password</Button>
      </div>
    </form>
  );
}
