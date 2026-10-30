import { FiSettings } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import SettingsTabs from "@/features/settings/components/SettingsTabs.jsx";
import ProfileForm from "@/features/settings/components/ProfileForm.jsx";

export default function ProfileSettingsPage() {
  return (
    <div>
      <PageHeader icon={FiSettings} title="Settings" description="Manage your account and preferences" />
      <SettingsTabs />
      <Card className="max-w-2xl">
        <ProfileForm />
      </Card>
    </div>
  );
}
