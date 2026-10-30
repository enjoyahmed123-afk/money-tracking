import { useState } from "react";
import { FiSlash, FiCheckCircle } from "react-icons/fi";
import Button from "@/components/ui/Button.jsx";
import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";

export default function SuspendActivateButton({ suspended = false }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={suspended ? "primary" : "danger"} icon={suspended ? FiCheckCircle : FiSlash} onClick={() => setOpen(true)}>
        {suspended ? "Activate User" : "Suspend User"}
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        danger={!suspended}
        title={suspended ? "Activate this user?" : "Suspend this user?"}
        description={suspended ? "The user will regain full access immediately." : "The user will lose access until reactivated."}
        confirmLabel={suspended ? "Activate" : "Suspend"}
      />
    </>
  );
}
