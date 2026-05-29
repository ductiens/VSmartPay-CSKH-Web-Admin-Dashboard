import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-lg">
        {/* Header */}
        <div className="col-span-12">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">{t("nav.overview")}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{t("dashboard.welcome")}</p>
        </div>

        {/* Stats Cards */}
        <div className="col-span-3 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <div className="flex items-center justify-between mb-sm">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Total Tickets</h3>
            <span className="material-symbols-outlined text-secondary-fixed text-2xl">confirmation_number</span>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface">1,234</p>
          <p className="font-body-md text-body-md text-secondary mt-1">↑ 12% from last month</p>
        </div>

        <div className="col-span-3 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <div className="flex items-center justify-between mb-sm">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Resolved Today</h3>
            <span className="material-symbols-outlined text-secondary-fixed text-2xl">check_circle</span>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface">42</p>
          <p className="font-body-md text-body-md text-secondary mt-1">↑ 8% from yesterday</p>
        </div>

        <div className="col-span-3 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <div className="flex items-center justify-between mb-sm">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Response Time</h3>
            <span className="material-symbols-outlined text-secondary-fixed text-2xl">schedule</span>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface">2.5m</p>
          <p className="font-body-md text-body-md text-secondary mt-1">↓ 10% improvement</p>
        </div>

        <div className="col-span-3 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <div className="flex items-center justify-between mb-sm">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Satisfaction Rate</h3>
            <span className="material-symbols-outlined text-secondary-fixed text-2xl">star</span>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface">92%</p>
          <p className="font-body-md text-body-md text-secondary mt-1">↑ 4% increase</p>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <h2 className="font-title-lg text-title-lg text-on-surface mb-md">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-md text-on-surface">
              <thead className="border-b border-outline-variant">
                <tr>
                  <th className="pb-sm font-label-md text-label-md text-on-surface-variant">Ticket</th>
                  <th className="pb-sm font-label-md text-label-md text-on-surface-variant">Customer</th>
                  <th className="pb-sm font-label-md text-label-md text-on-surface-variant">Status</th>
                  <th className="pb-sm font-label-md text-label-md text-on-surface-variant">Agent</th>
                  <th className="pb-sm font-label-md text-label-md text-on-surface-variant">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr>
                  <td className="py-sm">#TK-2023-991</td>
                  <td>Nguyen Tran Vy</td>
                  <td>
                    <span className="px-2 py-1 bg-secondary-fixed/10 text-secondary-fixed rounded text-label-md font-label-md">
                      In Progress
                    </span>
                  </td>
                  <td>Minh Tuan</td>
                  <td className="text-on-surface-variant">2 hours ago</td>
                </tr>
                <tr>
                  <td className="py-sm">#TK-2023-990</td>
                  <td>Le Minh Duc</td>
                  <td>
                    <span className="px-2 py-1 bg-secondary-fixed/10 text-secondary-fixed rounded text-label-md font-label-md">
                      Resolved
                    </span>
                  </td>
                  <td>Dang Xuan</td>
                  <td className="text-on-surface-variant">4 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
