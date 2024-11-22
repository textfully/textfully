"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import clsx from "clsx";

interface PageLayoutProps {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: PageLayoutProps) => {
  const pathname = usePathname();

  const currentSection = pathname.split("/")[2] || "home";
  const isHome = currentSection === "home";

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      <div className="flex flex-row h-screen w-full">
        <div className={clsx(isHome ? "min-w-64" : "min-w-16")} />
        <div
          className={clsx(
            "flex flex-col overflow-hidden",
            isHome ? "w-[calc(100%-256px)]" : "w-[calc(100%-64px)]"
          )}
        >
          <Topbar />
          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
