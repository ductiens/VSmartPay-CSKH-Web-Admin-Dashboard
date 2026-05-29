import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">{t("nav.settings")}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Manage system configuration and preferences
          </p>
        </div>

        <div className="grid grid-cols-12 gap-lg">
          {/* Account Settings */}
          <div className="col-span-6 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
            <h2 className="font-title-lg text-title-lg text-on-surface mb-md">Account Settings</h2>
            <div className="flex flex-col gap-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Full Name</label>
                <input
                  type="text"
                  value="Admin User"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Email</label>
                <input
                  type="email"
                  value="admin@vsmartpay.com"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
                />
              </div>
              <button className="px-4 py-2 bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold rounded hover:brightness-105 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="col-span-6 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
            <h2 className="font-title-lg text-title-lg text-on-surface mb-md">Notifications</h2>
            <div className="flex flex-col gap-md">
              <label className="flex items-center gap-md cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="font-body-md text-body-md text-on-surface">Email notifications for new tickets</span>
              </label>
              <label className="flex items-center gap-md cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="font-body-md text-body-md text-on-surface">Push notifications for urgent cases</span>
              </label>
              <label className="flex items-center gap-md cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="font-body-md text-body-md text-on-surface">Digest emails (daily summary)</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="col-span-6 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
            <h2 className="font-title-lg text-title-lg text-on-surface mb-md">Security</h2>
            <div className="flex flex-col gap-md">
              <button className="text-left px-4 py-2 border border-outline-variant rounded font-body-md text-body-md text-on-surface hover:bg-surface-container-low transition-colors">
                Change Password
              </button>
              <button className="text-left px-4 py-2 border border-outline-variant rounded font-body-md text-body-md text-on-surface hover:bg-surface-container-low transition-colors">
                Enable Two-Factor Authentication
              </button>
              <button className="text-left px-4 py-2 border border-outline-variant rounded font-body-md text-body-md text-on-surface hover:bg-surface-container-low transition-colors">
                View Active Sessions
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="col-span-6 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
            <h2 className="font-title-lg text-title-lg text-on-surface mb-md">System</h2>
            <div className="flex flex-col gap-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Language</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all">
                  <option>English</option>
                  <option>Tiếng Việt</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Theme</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
