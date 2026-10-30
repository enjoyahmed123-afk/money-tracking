import FormField from "@/components/ui/FormField.jsx";
import Select from "@/components/ui/Select.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";

export default function SubscriptionForm() {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Plan" required>
        <Select defaultValue="pro">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="business">Business</option>
        </Select>
      </FormField>
      <FormField label="Renewal Date">
        <Input type="date" />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit">Update Subscription</Button>
      </div>
    </form>
  );
}
