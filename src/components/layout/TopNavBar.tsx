import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/auth/store";
import { logout } from "../../redux/auth/slice";

export default function TopNavBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = () => {
    if (!user) return "AD";
    if (user.firstName) {
      const parts = user.firstName.trim().split(" ");
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return user.firstName.substring(0, 2).toUpperCase();
    }
    return user.username ? user.username.substring(0, 2).toUpperCase() : "AD";
  };

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-260px)] items-center justify-between border-b border-[#c2c8c4] bg-[#fcf9f8] px-6">
      <div className="flex items-center">
        <div className="relative flex w-[440px] items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#424845]">search</span>
          <input
            className="w-full rounded-full border border-[#c2c8c4] bg-[#f6f3f2] py-2 pl-10 pr-4 text-[14px] leading-5 text-[#1c1b1b] transition-all focus:border-[#50fec1] focus:outline-none focus:ring-1 focus:ring-[#50fec1]"
            placeholder={t("common.search")}
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#424845] transition-all hover:bg-[#f6f3f2]">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#424845] transition-all hover:bg-[#f6f3f2]">
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        {/* User Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex h-10 items-center gap-2 rounded-full border border-[#c2c8c4] bg-[#f6f3f2] px-3 py-1 cursor-pointer hover:border-[#00D99F] transition-all"
          >
            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-[#c2c8c4] bg-[#0b1f1a]">
              <span className="text-[11px] font-semibold leading-4 tracking-wider text-[#50fec1]">
                {getInitials()}
              </span>
            </div>
            {user && (
              <span className="text-[13px] font-medium text-[#1c1b1b] max-w-[120px] truncate">
                {user.firstName || user.username}
              </span>
            )}
            <span className="material-symbols-outlined text-[16px] text-[#424845]">
              keyboard_arrow_down
            </span>
          </button>

          {showDropdown && (
            <>
              {/* Overlay background to capture clicks outside */}
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2 z-50 w-52 rounded-xl border border-[#e5e2e1] bg-white p-2 shadow-xl animate-fade-in">
                {user && (
                  <div className="border-b border-[#E9EEF1] px-3 py-2.5 text-left">
                    <p className="text-[14px] font-bold text-black truncate">
                      {user.firstName}
                    </p>
                    <p className="text-[11px] text-[#727875] truncate mt-0.5">
                      {user.email || user.username}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer mt-1"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
