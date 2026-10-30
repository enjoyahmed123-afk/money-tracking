import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Button from "@/components/ui/Button.jsx";
import AvatarUpload from "@/features/settings/components/AvatarUpload.jsx";

export default function ProfileForm() {
  return (
    <form className="flex flex-col gap-6">
      <AvatarUpload />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required>
          <Input defaultValue="Sara Ahmed" />
        </FormField>
        <FormField label="Phone Number">
          <Input placeholder="+20 100 000 0000" />
        </FormField>
      </div>
      <FormField label="Base Currency" required>
        <Select defaultValue="usd">
          <option value="usd">USD — US Dollar</option>
          <option value="eur">EUR — Euro</option>
          <option value="egp">EGP — Egyptian Pound</option>
        </Select>
      </FormField>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
