import { useTranslation } from "react-i18next";

export default function TopNavBar() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-lg z-40">
      <div className="flex items-center">
        <div className="relative flex items-center w-64">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">search</span>
          <input
            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
            placeholder={t("common.search")}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-md">
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
          <img
            alt="Staff Account Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlq8RyfY-Sza4GTaSJpN8e-FG3qJ0MQgmnjCdyUa_AXOhOFTDrRm04L6ZtRwYwjQtn00hxSyNiloL7o_ltMjdic_COsAxpU8UA1igqnmUO6pqrkpSwxL9c6tIKHQrOnSQIMwDU7R0ryWgZBsaCh3ew66YtHROXnThMtGBWZaO9OBqaQj2d-NyPxrpz-6mFfe_3aLJd2RlZA8OgHncwbcY-tGewvCcuxelK2kX90vs4QJh5YKMrFxFcHk3cdTYkhDVGpTdMpkO60TI"
          />
        </div>
      </div>
    </header>
  );
}
