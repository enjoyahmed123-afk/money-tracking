import { FiSettings } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import SettingsTabs from "@/features/settings/components/SettingsTabs.jsx";
import EmailChangeForm from "@/features/settings/components/EmailChangeForm.jsx";
import PasswordChangeForm from "@/features/settings/components/PasswordChangeForm.jsx";

export default function SecuritySettingsPage() {
  return (
    <div>
      <PageHeader icon={FiSettings} title="Settings" description="Manage your account and preferences" />
      <SettingsTabs />
      <div className="grid max-w-2xl grid-cols-1 gap-6">
        <Card>
          <h3 className="mb-5 font-bold text-slate-100">Change Email</h3>
          <EmailChangeForm />
        </Card>
        <Card>
          <h3 className="mb-5 font-bold text-slate-100">Change Password</h3>
          <PasswordChangeForm />
        </Card>
      </div>
    </div>
  );
}
