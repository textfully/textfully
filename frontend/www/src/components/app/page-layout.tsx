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
      <div className="flex flex-row min-h-screen w-full">
        <div className="w-16" />
        <div className="w-full">
          <Topbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
