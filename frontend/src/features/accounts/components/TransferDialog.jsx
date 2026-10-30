import { FiArrowRight } from "react-icons/fi";
import Modal from "@/components/ui/Modal.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Select from "@/components/ui/Select.jsx";
import CurrencyInput from "@/components/common/CurrencyInput.jsx";
import Button from "@/components/ui/Button.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function TransferDialog({ open, onClose }) {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("Transfer Between Accounts")}
      description={t("Move money internally, e.g. a cash withdrawal from your bank")}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button iconRight={FiArrowRight} onClick={onClose}>
            {t("Transfer")}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label={t("From")} required>
            <Select defaultValue="main-bank">
              <option value="main-bank">Main Bank</option>
              <option value="wallet">Vodafone Cash</option>
            </Select>
          </FormField>
          <FormField label={t("To")} required>
            <Select defaultValue="cash">
              <option value="cash">Cash on Hand</option>
              <option value="main-bank">Main Bank</option>
            </Select>
          </FormField>
        </div>
        <FormField label={t("Amount")} required>
          <CurrencyInput />
        </FormField>
      </div>
    </Modal>
  );
}
