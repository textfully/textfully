"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { settingsLinks } from "@/constants/nav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  // Set the active tab based on the current pathname
  useEffect(() => {
    const activeLink = settingsLinks.find((link) => pathname === link.href);
    setActiveTab(activeLink?.href);
  }, [pathname]);

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="container p-2 space-y-6">
      <div className="overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          defaultValue={settingsLinks[0].href}
        >
          <TabsList>
            {settingsLinks.map((link) => (
              <TabsTrigger key={link.href} value={link.href}>
                {link.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div>{children}</div>
    </div>
  );
}
