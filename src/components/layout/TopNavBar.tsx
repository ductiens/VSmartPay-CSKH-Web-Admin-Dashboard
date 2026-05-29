import { useTranslation } from "react-i18next";

export default function TopNavBar() {
  const { t } = useTranslation();

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
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#c2c8c4] bg-[#0b1f1a]">
          <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#50fec1]">AD</span>
        </div>
      </div>
    </header>
  );
}
