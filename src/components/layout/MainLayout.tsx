import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fcf9f8]">
      <Sidebar />
      <TopNavBar />
      <main className="ml-[260px] mt-16 h-[calc(100vh-64px)] overflow-y-auto bg-[#fcf9f8] px-6 py-6">
        {children}
      </main>
    </div>
  );
}
