import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";

export default function EmailChangeForm() {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Current Email" hint="A verification link will be sent to your new email">
        <Input defaultValue="sara@example.com" disabled className="opacity-60" />
      </FormField>
      <FormField label="New Email" required>
        <Input type="email" placeholder="new@example.com" />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit">Update Email</Button>
      </div>
    </form>
  );
}
