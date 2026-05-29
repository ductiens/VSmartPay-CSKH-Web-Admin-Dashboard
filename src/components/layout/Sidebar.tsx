import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "nav.overview", icon: "dashboard" },
  { path: "/support-requests", label: "nav.supportRequests", icon: "confirmation_number" },
  { path: "/chat-sessions", label: "nav.chatSessions", icon: "forum" },
  { path: "/knowledge-base", label: "nav.knowledgeBase", icon: "library_books" },
  { path: "/reports", label: "nav.reports", icon: "analytics" },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-full w-[260px] bg-primary-container shadow-md flex flex-col py-lg z-50">
      {/* Logo Section */}
      <div className="px-md mb-xl flex items-center gap-sm">
        <div className="w-8 h-8 rounded bg-secondary-fixed flex items-center justify-center">
          <span
            className="material-symbols-outlined text-primary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            assured_workload
          </span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-secondary-fixed">VSmartPay</h1>
          <p className="font-label-md text-label-md text-on-primary-fixed-variant">{t("app.adminDashboard")}</p>
        </div>
      </div>

      {/* Navigation Items */}
      <ul className="flex-1 flex flex-col gap-xs px-sm">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-md px-md py-sm rounded-lg font-label-md text-label-md transition-colors ${
                  isActive
                    ? "text-secondary-fixed font-bold border-l-4 border-secondary-fixed bg-on-primary-fixed-variant/20 opacity-90 scale-[0.99]"
                    : "text-on-primary-fixed-variant hover:bg-on-primary-fixed-variant/10 hover:text-secondary-fixed"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {t(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Settings */}
      <div className="px-sm mt-auto">
        <Link
          to="/settings"
          className="flex items-center gap-md px-md py-sm rounded-lg font-label-md text-label-md text-on-primary-fixed-variant hover:bg-on-primary-fixed-variant/10 hover:text-secondary-fixed transition-colors"
        >
          <span className="material-symbols-outlined">settings</span>
          {t("nav.settings")}
        </Link>
      </div>
    </nav>
  );
}
