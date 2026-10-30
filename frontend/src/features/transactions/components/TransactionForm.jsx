import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import CurrencyInput from "@/components/common/CurrencyInput.jsx";
import Button from "@/components/ui/Button.jsx";

export default function TransactionForm({ onCancel }) {
  return (
    <form className="flex flex-col gap-5">
      <FormField label="Description" required>
        <Input placeholder="e.g. Grocery shopping" />
      </FormField>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Type" required>
          <Select defaultValue="expense">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </Select>
        </FormField>
        <FormField label="Account" required>
          <Select defaultValue="main-bank">
            <option value="main-bank">Main Bank</option>
            <option value="wallet">Vodafone Cash</option>
            <option value="cash">Cash on Hand</option>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Amount" required>
          <CurrencyInput />
        </FormField>
        <FormField label="Date" required>
          <Input type="date" />
        </FormField>
      </div>
      <div className="mt-2 flex justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Transaction</Button>
      </div>
    </form>
  );
}
