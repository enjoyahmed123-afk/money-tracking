import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as api from "../api/accounts";
import { apiErrorMessage } from "../api/client";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import { FormField, Input, Select } from "../components/ui/Field";
import { formatMoney } from "../utils/format";
import { ACCOUNT_TYPES, CURRENCIES, ACCOUNT_COLORS } from "../utils/constants";

const emptyForm = { name: "", type: "cash", balance: "", currency: "EGP", color: ACCOUNT_COLORS[0] };

function typeInfo(type) {
  return ACCOUNT_TYPES.find((t) => t.value === type) ?? ACCOUNT_TYPES[0];
}

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active"); // active | archived

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [adjustTarget, setAdjustTarget] = useState(null);
  const [adjustValue, setAdjustValue] = useState("");
  const [adjustNote, setAdjustNote] = useState("");
  const [adjustConfirmOpen, setAdjustConfirmOpen] = useState(false);
  const [adjusting, setAdjusting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    api
      .listAccounts()
      .then(setAccounts)
      .catch((err) => toast.error(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const activeAccounts = accounts.filter((a) => a.isActive);
  const archivedAccounts = accounts.filter((a) => !a.isActive);
  const shown = tab === "active" ? activeAccounts : archivedAccounts;

  /* total wealth grouped by currency (mixed currencies can't be summed correctly) */
  const totalsByCurrency = activeAccounts.reduce((acc, a) => {
    acc[a.currency] = (acc[a.currency] ?? 0) + a.balance;
    return acc;
  }, {});

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(acc, e) {
    e.stopPropagation();
    setEditing(acc);
    setForm({ name: acc.name, type: acc.type, balance: acc.balance, currency: acc.currency, color: acc.color });
    setFormOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.type || !form.currency || (!editing && form.balance === "")) {
      toast.error("كل الحقول إلزامية ما عدا اللون");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.updateAccount(editing._id, {
          name: form.name, type: form.type, currency: form.currency, color: form.color,
        });
        setAccounts((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
        toast.success("تم تحديث الحساب");
      } else {
        const created = await api.createAccount(form);
        setAccounts((prev) => [...prev, created]);
        toast.success("تم إنشاء الحساب");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(apiErrorMessage(err, "تعذر حفظ الحساب"));
    } finally {
      setSaving(false);
    }
  }

  function openAdjust(acc, e) {
    e.stopPropagation();
    setAdjustTarget(acc);
    setAdjustValue(String(acc.balance));
    setAdjustNote("");
  }

  function requestAdjustConfirm(e) {
    e.preventDefault();
    if (adjustValue === "" || Number.isNaN(parseFloat(adjustValue))) {
      toast.error("اكتب رصيد صحيح");
      return;
    }
    setAdjustConfirmOpen(true);
  }

  async function handleAdjustConfirmed() {
    setAdjusting(true);
    try {
      const updated = await api.adjustBalance(adjustTarget._id, {
        newBalance: adjustValue,
        notes: adjustNote.trim() || undefined,
      });
      setAccounts((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      toast.success("تم تعديل الرصيد");
      setAdjustConfirmOpen(false);
      setAdjustTarget(null);
    } catch (err) {
      toast.error(apiErrorMessage(err, "تعذر تعديل الرصيد"));
    } finally {
      setAdjusting(false);
    }
  }

  async function handleToggleArchive(acc, e) {
    e.stopPropagation();
    try {
      const updated = await api.toggleArchive(acc._id);
      setAccounts((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      toast.success(updated.isActive ? "تم تفعيل الحساب" : "تم أرشفة الحساب");
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await api.removeAccount(deleteTarget._id);
      setAccounts((prev) => prev.filter((a) => a._id !== deleteTarget._id));
      toast.success("تم حذف الحساب");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(apiErrorMessage(err, "تعذر حذف الحساب"));
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Spinner full />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">الحسابات والمحافظ</h1>
        <Button onClick={openCreate}>+ حساب جديد</Button>
      </div>

      {/* Total wealth */}
      {activeAccounts.length > 0 && (
        <Card className="bg-gradient-to-br from-teal-600 to-emerald-700 p-6 text-white">
          <p className="text-sm text-teal-50/90">إجمالي الثروة (الحسابات النشطة)</p>
          <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-1">
            {Object.entries(totalsByCurrency).map(([currency, total]) => (
              <p
                key={currency}
                className={`text-3xl font-extrabold ${total < 0 ? "text-red-200" : "text-white"}`}
              >
                {formatMoney(total, currency)}
              </p>
            ))}
          </div>
          {Object.keys(totalsByCurrency).length > 1 && (
            <p className="mt-1 text-xs text-teal-50/70">
              الأرصدة مجمّعة لكل عملة على حدة (مفيش تحويل عملات تلقائي)
            </p>
          )}
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setTab("active")}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === "active" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          نشطة ({activeAccounts.length})
        </button>
        <button
          onClick={() => setTab("archived")}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === "archived" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          مؤرشفة ({archivedAccounts.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon="🏦"
          title={tab === "active" ? "مفيش حسابات نشطة" : "مفيش حسابات مؤرشفة"}
          description={tab === "active" ? "اعمل أول حساب عشان تقدر تتابع فلوسك." : undefined}
          action={tab === "active" ? <Button onClick={openCreate}>+ حساب جديد</Button> : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((acc) => {
            const info = typeInfo(acc.type);
            return (
              <Card
                key={acc._id}
                onClick={() => navigate(`/accounts/${acc._id}`, { state: { account: acc } })}
                className={`cursor-pointer p-5 transition-shadow hover:shadow-md ${!acc.isActive ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-lg text-white"
                      style={{ backgroundColor: acc.color }}
                    >
                      {info.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{acc.name}</p>
                      <p className="text-xs text-gray-400">{info.label}</p>
                    </div>
                  </div>
                  {!acc.isActive && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">مؤرشف</span>
                  )}
                </div>

                <p className={`mt-4 text-2xl font-bold ${acc.balance < 0 ? "text-red-500" : "text-gray-900"}`}>
                  {formatMoney(acc.balance, acc.currency)}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                  <button onClick={(e) => openEdit(acc, e)} className="text-xs font-medium text-teal-600 hover:underline">
                    تعديل
                  </button>
                  <button onClick={(e) => openAdjust(acc, e)} className="text-xs font-medium text-teal-600 hover:underline">
                    تعديل الرصيد
                  </button>
                  <button onClick={(e) => handleToggleArchive(acc, e)} className="text-xs font-medium text-gray-500 hover:underline">
                    {acc.isActive ? "أرشفة" : "تفعيل"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(acc); }}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    حذف
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create / Edit modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "تعديل الحساب" : "حساب جديد"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave} loading={saving}>حفظ</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="اسم الحساب" required>
            <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </FormField>
          <FormField label="نوع الحساب" required>
            <Select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              {ACCOUNT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </Select>
          </FormField>
          {!editing && (
            <FormField label="الرصيد الابتدائي" required>
              <Input
                type="number" step="0.01" required
                value={form.balance}
                onChange={(e) => setForm((f) => ({ ...f, balance: e.target.value }))}
              />
            </FormField>
          )}
          <FormField label="العملة" required>
            <Select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}>
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </FormField>
          <FormField label="اللون">
            <div className="flex flex-wrap gap-2">
              {ACCOUNT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className={`h-8 w-8 rounded-full ring-offset-2 ${form.color === c ? "ring-2 ring-gray-900" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </FormField>
        </form>
      </Modal>

      {/* Adjust balance — step 1: enter new value + note */}
      <Modal
        open={!!adjustTarget && !adjustConfirmOpen}
        onClose={() => setAdjustTarget(null)}
        title={`تعديل رصيد ${adjustTarget?.name ?? ""}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAdjustTarget(null)}>إلغاء</Button>
            <Button onClick={requestAdjustConfirm}>التالي</Button>
          </>
        }
      >
        <form onSubmit={requestAdjustConfirm} className="space-y-4">
          <p className="text-sm text-gray-500">
            الرصيد الحالي: <span className="font-semibold text-gray-800">{formatMoney(adjustTarget?.balance, adjustTarget?.currency)}</span>
          </p>
          <FormField label="الرصيد الجديد" required>
            <Input type="number" step="0.01" required value={adjustValue} onChange={(e) => setAdjustValue(e.target.value)} />
          </FormField>
          <FormField label="ملاحظة (اختياري)" hint="سبب التعديل — هيتسجل في تاريخ الحساب">
            <Input value={adjustNote} onChange={(e) => setAdjustNote(e.target.value)} placeholder="مثال: تصحيح فرق كاش" />
          </FormField>
        </form>
      </Modal>

      {/* Adjust balance — step 2: confirm old → new */}
      <ConfirmDialog
        open={adjustConfirmOpen}
        onClose={() => setAdjustConfirmOpen(false)}
        onConfirm={handleAdjustConfirmed}
        loading={adjusting}
        danger={false}
        title="تأكيد تعديل الرصيد"
        confirmLabel="تأكيد التعديل"
        message={
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <span className="text-gray-500">الرصيد الحالي</span>
              <span className="font-semibold text-gray-900">
                {formatMoney(adjustTarget?.balance, adjustTarget?.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-teal-50 p-3">
              <span className="text-teal-700">الرصيد الجديد</span>
              <span className="font-bold text-teal-800">
                {formatMoney(adjustValue, adjustTarget?.currency)}
              </span>
            </div>
            {adjustNote.trim() && <p className="text-xs text-gray-400">ملاحظة: {adjustNote}</p>}
          </div>
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="حذف الحساب"
        message={`متأكد إنك عايز تحذف "${deleteTarget?.name}"؟ تاريخ الحركات المرتبط بيه هيتحذف كمان.`}
        confirmLabel="حذف"
      />
    </div>
  );
}
