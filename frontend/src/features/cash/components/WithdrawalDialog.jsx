import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "@/components/ui/Modal.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Select from "@/components/ui/Select.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { transferFunds } from "@/store/accountSlice";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function WithdrawalDialog({ open, onClose, cashAccount }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items: accounts, status } = useSelector((state) => state.account);
  const submitting = status === "loading";

  const sourceAccounts = accounts.filter((a) => a.isActive && a._id !== cashAccount?._id);

  const [fromId, setFromId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFromId(sourceAccounts[0]?._id ?? "");
      setAmount("");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleConfirm = async () => {
    const amt = parseFloat(amount);
    if (!fromId) {
      setError(t("Choose an account to withdraw from"));
      return;
    }
    if (!amt || amt <= 0) {
      setError(t("Enter a valid amount"));
      return;
    }
    setError("");
    try {
      await dispatch(
        transferFunds({ fromId, toId: cashAccount._id, amount: amt, description: "Cash withdrawal" })
      ).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم سحب الكاش بنجاح"),
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      onClose();
    } catch (errMessage) {
      Swal.fire({
        icon: "error",
        title: errMessage || t("Could not complete withdrawal."),
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
      title={t("Withdraw Cash from Bank")}
      description={t("Recorded as an internal transfer between the two accounts")}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleConfirm} disabled={submitting}>
            {submitting ? t("Processing...") : t("Confirm Withdrawal")}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <FormField label={t("Withdraw From")} required>
          <Select value={fromId} onChange={(e) => setFromId(e.target.value)}>
            {sourceAccounts.length === 0 && <option value="">{t("No other accounts")}</option>}
            {sourceAccounts.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </Select>
        </FormField>
        <FormField label={t("Amount")} required error={error}>
          <Input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormField>
      </div>
    </Modal>
  );
}
