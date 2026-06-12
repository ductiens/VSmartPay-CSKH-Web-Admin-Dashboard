import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  // { path: "/dashboard", label: "nav.overview", icon: "dashboard" },
  // { path: "/support-requests", label: "nav.supportRequests", icon: "confirmation_number" },
  { path: "/chat-sessions", label: "nav.chatSessions", icon: "forum" },
  { path: "/knowledge-base", label: "nav.knowledgeBase", icon: "library_books" },
  // { path: "/reports", label: "nav.reports", icon: "analytics" },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col bg-[#0b1f1a] py-6 shadow-md">
      <div className="mb-8 flex items-center gap-2 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#50fec1] text-[#0b1f1a]">
          <span
            className="material-symbols-outlined text-[22px] font-bold"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance_wallet
          </span>
        </div>
        <div>
          <h1 className="text-[20px] font-bold leading-7 text-[#50fec1]">VSmartPay</h1>
          <p className="text-[12px] font-semibold leading-4 tracking-wider text-[#738881]">Admin Dashboard</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === "/" ? item.path === "/dashboard" : location.pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={
                  isActive
                    ? "flex scale-[0.99] items-center gap-4 border-l-4 border-[#50fec1] bg-[#374b44]/20 px-4 py-2 text-[12px] font-bold leading-4 tracking-wider text-[#50fec1] opacity-90 transition-colors"
                    : "flex items-center gap-4 rounded-lg px-4 py-2 text-[12px] font-semibold leading-4 tracking-wider text-[#738881] transition-colors hover:bg-[#374b44]/20 hover:text-[#50fec1]"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {t(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* <div className="mt-auto px-2">
        <Link
          to="/settings"
          className="flex items-center gap-4 rounded-lg px-4 py-2 text-[12px] font-semibold leading-4 tracking-wider text-[#738881] transition-colors hover:bg-[#374b44]/20 hover:text-[#50fec1]"
        >
          <span className="material-symbols-outlined">settings</span>
          {t("nav.settings")}
        </Link>
      </div> */}
    </nav>
  );
}
