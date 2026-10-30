import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import CurrencyInput from "@/components/common/CurrencyInput.jsx";
import Button from "@/components/ui/Button.jsx";

export default function GoalForm({ onCancel }) {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Goal Name" required>
        <Input placeholder="e.g. Emergency Fund" />
      </FormField>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Target Amount" required>
          <CurrencyInput />
        </FormField>
        <FormField label="Target Date" required>
          <Input type="date" />
        </FormField>
      </div>
      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Goal</Button>
      </div>
    </form>
  );
}
