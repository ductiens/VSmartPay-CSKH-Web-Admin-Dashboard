import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout";

export default function ChatSessionsPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">{t("nav.chatSessions")}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage and monitor customer chat sessions</p>
        </div>

        <div className="bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg p-md border border-surface-container-highest">
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">forum</span>
            <p className="font-headline-md text-headline-md text-on-surface-variant">Chat Sessions Module</p>
            <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-md">
              Coming soon - Monitor and manage all customer chat sessions in real-time
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
