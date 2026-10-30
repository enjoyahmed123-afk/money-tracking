import { useState } from "react";
import Modal from "@/components/ui/Modal.jsx";
import Tabs from "@/components/ui/Tabs.jsx";
import FormField from "@/components/ui/FormField.jsx";
import CurrencyInput from "@/components/common/CurrencyInput.jsx";
import Button from "@/components/ui/Button.jsx";

export default function DepositWithdrawDialog({ open, onClose }) {
  const [mode, setMode] = useState("deposit");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Update Savings Goal"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Confirm</Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Tabs
          tabs={[
            { value: "deposit", label: "Deposit" },
            { value: "withdraw", label: "Withdraw" },
          ]}
          active={mode}
          onChange={setMode}
        />
        <FormField label="Amount" required>
          <CurrencyInput />
        </FormField>
      </div>
    </Modal>
  );
}
