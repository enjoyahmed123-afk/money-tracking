import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "@/components/ui/Modal.jsx";
import FormField from "@/components/ui/FormField.jsx";
import Input from "@/components/ui/Input.jsx";
import TextArea from "@/components/ui/TextArea.jsx";
import Button from "@/components/ui/Button.jsx";
import { adjustBalance } from "@/store/accountSlice";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function AdjustBalanceDialog({ open, onClose, account }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.account);
  const submitting = status === "loading";

  const [newBalance, setNewBalance] = useState(account?.balance ?? 0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setNewBalance(account?.balance ?? 0);
      setNotes("");
    }
  }, [open, account]);

  if (!account) return null;

  const parsedNew = parseFloat(newBalance);
  const diff = isNaN(parsedNew) ? 0 : parsedNew - account.balance;

  const handleConfirm = async () => {
    if (isNaN(parsedNew)) return;
    try {
      await dispatch(adjustBalance({ id: account._id, newBalance: parsedNew, notes: notes || undefined })).unwrap();
      Swal.fire({
        icon: "success",
        title: t("تم تعديل الرصيد بنجاح"),
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
        title: errMessage || t("Could not adjust balance."),
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
      title={t("Adjust Balance")}
      description={`${t("Current balance:")} ${formatCurrency(account.balance, account.currency)}`}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleConfirm} disabled={submitting || isNaN(parsedNew)}>
            {submitting ? t("Saving...") : t("Confirm Adjustment")}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <FormField label={t("New Balance")} required>
          <Input type="number" step="0.01" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} />
        </FormField>

        {!isNaN(parsedNew) && (
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <span className="text-slate-400">
              {formatCurrency(account.balance, account.currency)} → <span className="font-bold text-slate-100">{formatCurrency(parsedNew, account.currency)}</span>
            </span>
            <span className={`font-bold ${diff < 0 ? "text-red-400" : diff > 0 ? "text-emerald-400" : "text-slate-500"}`}>
              {diff > 0 ? "+" : ""}{formatCurrency(diff, account.currency)}
            </span>
          </div>
        )}

        <FormField label={t("Reason (optional)")}>
          <TextArea rows={3} placeholder={t("e.g. Correcting untracked cash withdrawal")} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormField>
      </div>
    </Modal>
  );
}
