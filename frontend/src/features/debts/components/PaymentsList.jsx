import { useSelector } from "react-redux";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiClock } from "react-icons/fi";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function PaymentsList({ payments, currency }) {
  const { t } = useTranslation();
  const { items: accounts } = useSelector((state) => state.account);

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={FiClock}
        title={t("No payments yet")}
        description={t("Payments you make toward this debt will show up here.")}
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>{t("Date")}</TH>
          <TH>{t("Amount")}</TH>
          <TH>{t("Paid From")}</TH>
        </TR>
      </THead>
      <TBody>
        {payments.map((p) => {
          const account = accounts.find((a) => a._id === p.accountId);
          return (
            <TR key={p._id}>
              <TD className="text-slate-400">
                {new Date(p.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              </TD>
              <TD className="font-bold text-emerald-400">{formatCurrency(p.amount, currency)}</TD>
              <TD className="text-slate-300">{account?.name ?? "—"}</TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
}
