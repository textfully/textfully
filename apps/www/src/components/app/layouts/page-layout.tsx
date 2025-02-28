"use client";

import { useAuthContext } from "@/contexts/use-auth-context";
import { useState, useEffect } from "react";
import { checkHealth } from "@/api/health/check-health";
import { MaintenancePage } from "../pages/maintenance-page";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { loading } = useAuthContext();
  const [isHealthy, setIsHealthy] = useState(true);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await checkHealth();
        setIsHealthy(response.status === "healthy");
      } catch (error) {
        setIsHealthy(false);
      }
    };

    checkServerHealth();
  }, []);

  if (!isHealthy) {
    return <MaintenancePage />;
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
