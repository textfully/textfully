"use client";

import { usePathname, useRouter } from "next/navigation";
import { SETTINGS_LINKS } from "@/constants/nav";
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

  useEffect(() => {
    const activeLink = SETTINGS_LINKS.find((link) => pathname === link.href);
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
          defaultValue={SETTINGS_LINKS[0].href}
        >
          <TabsList>
            {SETTINGS_LINKS.map((link) => (
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
