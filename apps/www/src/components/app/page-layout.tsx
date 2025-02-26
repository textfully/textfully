"use client";

import { useAuthContext } from "@/contexts/use-auth-context";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { createRedirectLink } from "@/lib/utils";
import { redirect } from "next/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: PageLayoutProps) => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) {
    redirect(createRedirectLink("/login", window.location.pathname));
  }

  return (
    <div className="relative min-h-screen bg-zinc-950">
      <div className="absolute inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      <div className="flex flex-row h-screen w-full">
        <div className="min-w-64" />
        <div className="flex flex-col overflow-hidden w-full">
          <Topbar />
          <main
            className="p-6 flex-1 overflow-y-auto focus:outline-none"
            tabIndex={-1}
          >
            {loading ? <></> : children}
          </main>
        </div>
      </div>
    </div>
  );
};
