import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavBar />
        <main className="ml-[260px] mt-[64px] h-[calc(100vh-64px)] overflow-y-auto p-lg bg-background">{children}</main>
      </div>
    </div>
  );
}
