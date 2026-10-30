import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "@/components/ui/Modal.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Select from "@/components/ui/Select.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { addPayment } from "@/store/debtSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddPaymentDialog({ open, onClose, debt, onSaved }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items: accounts } = useSelector((state) => state.account);
  const { status } = useSelector((state) => state.debt);
  const submitting = status === "loading";
  const activeAccounts = accounts.filter((a) => a.isActive);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setAmount("");
      setDate(today());
      setAccountId(activeAccounts[0]?._id ?? "");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleConfirm = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError(t("Enter a valid amount"));
      return;
    }
    if (!accountId) {
      setError(t("Choose an account to pay from"));
      return;
    }
    setError("");
    try {
      await dispatch(addPayment({ id: debt._id, data: { amount: amt, date, accountId } })).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم تسجيل الدفعة بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      onSaved?.();
      onClose();
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not save payment."),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("Add Payment")}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleConfirm} disabled={submitting}>
            {submitting ? t("Saving...") : t("Save Payment")}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <FormField label={t("Amount")} required error={error}>
          <Input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormField>
        <FormField label={t("Date")} required>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormField>
        <FormField label={t("Paid From")} required>
          <Select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            {activeAccounts.length === 0 && <option value="">{t("No accounts yet")}</option>}
            {activeAccounts.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </Select>
        </FormField>
      </div>
    </Modal>
  );
}
