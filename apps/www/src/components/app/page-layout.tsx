"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface PageLayoutProps {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      <div className="flex flex-row h-screen w-full">
        <div className="min-w-16" />
        <div className="w-[calc(100%-64px)] flex flex-col overflow-hidden">
          <Topbar />
          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
