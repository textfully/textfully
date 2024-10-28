"use client";

import {
  ArrowUpRight,
  Code,
  CreditCard,
  Home,
  MessagesSquare,
  Phone,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/contexts/useAuthContext";
import Logo from "@/assets/logo";
import { cn } from "@/utils/helper";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  children?: MenuChildItem[];
  path?: string;
}

interface MenuChildItem {
  label: string;
  path: string;
}

export const Sidebar = () => {
  const { user, loading } = useAuthContext();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: MessagesSquare,
      label: "Messages",
      children: [
        { label: "Sent messages", path: "/dashboard/messages/sent" },
        { label: "Scheduled messages", path: "/dashboard/messages/scheduled" },
        { label: "Message templates", path: "/dashboard/messages/templates" },
      ],
    },
    {
      icon: Users,
      label: "Contacts",
      children: [
        { label: "Contact list", path: "/dashboard/contacts/list" },
        { label: "Audiences/Groups", path: "/dashboard/contacts/audiences" },
        { label: "Import contacts", path: "/dashboard/contacts/import" },
      ],
    },
    {
      icon: Phone,
      label: "Phone Numbers",
      children: [
        { label: "Manage numbers", path: "/dashboard/numbers/manage" },
        { label: "Buy new numbers", path: "/dashboard/numbers/buy" },
      ],
    },
    {
      icon: Code,
      label: "API",
      children: [
        { label: "API keys", path: "/dashboard/api/keys" },
        { label: "SDK integration guides", path: "/docs/sdk" },
        { label: "API documentation", path: "/docs" },
      ],
    },
    {
      icon: CreditCard,
      label: "Billing",
      children: [
        { label: "Plan & usage", path: "/dashboard/billing/plan" },
        { label: "Payment methods", path: "/dashboard/billing/payment" },
        { label: "Invoices", path: "/dashboard/billing/invoices" },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      children: [
        { label: "General", path: "/dashboard/settings/general" },
        { label: "Team", path: "/dashboard/settings/team" },
        { label: "Integrations", path: "/dashboard/settings/integrations" },
      ],
    },
  ];

  // Get the current section from the path (e.g. /dashboard/messages/sent -> messages)
  const currentSection = pathname.split("/")[2] || "home";
  const selectedMenuData = menuItems.find((item) => {
    if (currentSection === "home") return item.label === "Home";
    return item.children?.some((child) =>
      child?.path?.includes(`/${currentSection}/`)
    );
  });
  const isHome = currentSection === "home";

  return (
    <div
      className="flex h-screen"
      onMouseLeave={() => !loading && setIsHovered(false)}
    >
      <motion.div
        className="h-screen border-r border-zinc-800 bg-zinc-950 text-zinc-300 flex flex-col w-16"
        onMouseEnter={() => !loading && setIsHovered(true)}
        animate={{
          width: !loading && (isHovered || isHome) ? 256 : 64,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div className="pt-3 pb-1 flex items-center px-4 overflow-hidden">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <div className="w-5 h-5 text-[#0A93F6]">
              <Logo />
            </div>
          </div>
          {!loading && (
            <motion.p
              className="ml-2 text-base font-semibold text-white font-general whitespace-nowrap"
              animate={{ opacity: isHovered || isHome ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              style={{ display: isHovered || isHome ? "block" : "none" }}
            >
              Textfully
            </motion.p>
          )}
        </div>

        <div className="p-2 overflow-hidden">
          <Link
            href="/dashboard"
            className={cn(
              "w-full h-8 flex items-center rounded-md transition-colors",
              isHome ? "bg-zinc-800" : "hover:bg-zinc-900"
            )}
          >
            <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
              <Home className="w-4 h-4" />
            </div>
            {!loading && (
              <motion.span
                className="ml-2 text-sm whitespace-nowrap"
                animate={{ opacity: isHovered || isHome ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                style={{ display: isHovered || isHome ? "block" : "none" }}
              >
                Home
              </motion.span>
            )}
          </Link>
        </div>

        <div className="mx-4 h-px bg-zinc-800" />

        <nav className="flex-1 px-2 py-4 overflow-hidden space-y-2">
          {menuItems.map((item, index) => {
            const isSelected = item === selectedMenuData;
            return (
              <Link
                key={index}
                href={item.path ?? item.children?.[0]?.path ?? "/dashboard"}
                className={cn(
                  "w-full h-8 flex items-center rounded-md transition-colors",
                  isSelected ? "bg-zinc-800" : "hover:bg-zinc-900"
                )}
              >
                <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
                  {item.icon && <item.icon className="w-4 h-4" />}
                </div>
                {!loading && (
                  <motion.span
                    className="ml-2 text-sm whitespace-nowrap"
                    animate={{ opacity: isHovered || isHome ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ display: isHovered || isHome ? "block" : "none" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
        {user && !loading && (
          <div className="p-2 border-t border-zinc-800">
            <button className="w-full p-2 overflow-hidden hover:bg-zinc-800 transition-colors rounded-md">
              <div className="flex items-center ml-1">
                <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <motion.span
                  className="ml-2 text-sm text-zinc-400 truncate"
                  animate={{ opacity: isHovered || isHome ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: isHovered || isHome ? "block" : "none" }}
                >
                  {user.email}
                </motion.span>
              </div>
            </button>
          </div>
        )}
      </motion.div>

      {/* Submenu sidebar */}
      {!loading && !isHome && (
        <motion.div
          className="h-screen border-r border-zinc-800 bg-zinc-950 text-zinc-300 overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: selectedMenuData && !isHome ? 256 : 0,
            opacity: selectedMenuData && !isHome ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="h-14 px-4 flex items-center border-b border-zinc-800 w-64">
            <h2 className="font-semibold text-zinc-400">
              {selectedMenuData?.label}
            </h2>
          </div>

          <nav className="px-2 py-4 w-64 space-y-2">
            {selectedMenuData?.children?.map((child, index) => (
              <Link
                key={index}
                href={child.path ?? "/dashboard"}
                {...(!child.path.startsWith("/dashboard")
                  ? {
                      rel: "noopener noreferrer",
                      target: "_blank",
                    }
                  : {})}
                className={cn(
                  "w-full h-8 flex items-center px-3 text-sm rounded-md",
                  pathname === child.path ? "bg-zinc-800" : "hover:bg-zinc-900"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{child.label}</span>
                  {!child.path.startsWith("/dashboard") && (
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
};
