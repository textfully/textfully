"use client";

import {
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

export const Sidebar = () => {
  const { user, loading } = useAuthContext();
  const [selectedMenu, setSelectedMenu] = useState<string>("Home");
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      children: [],
    },
    {
      icon: MessagesSquare,
      label: "Messages",
      children: [
        { label: "Sent messages" },
        { label: "Scheduled messages" },
        { label: "Message templates" },
      ],
    },
    {
      icon: Users,
      label: "Contacts",
      children: [
        { label: "Contact list" },
        { label: "Audiences/Groups" },
        { label: "Import contacts" },
      ],
    },
    {
      icon: Phone,
      label: "Phone Numbers",
      children: [{ label: "Manage numbers" }, { label: "Buy new numbers" }],
    },
    {
      icon: Code,
      label: "API & SDK",
      children: [
        { label: "API keys" },
        { label: "API documentation" },
        { label: "SDK integration guides" },
      ],
    },
    {
      icon: CreditCard,
      label: "Billing",
      children: [
        { label: "Plan & usage" },
        { label: "Payment methods" },
        { label: "Invoices" },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      children: [
        { label: "Profile & password" },
        { label: "Notification preferences" },
        { label: "Team & user management" },
      ],
    },
  ];

  const selectedMenuData = menuItems.find(
    (item) => item.label === selectedMenu
  );
  const isHome = selectedMenu === "Home";

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
        <div className="h-14 flex items-center px-4 overflow-hidden">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <div className="w-5 h-5 text-[#0A93F6]">
              <Logo />
            </div>
          </div>
          <motion.p
            className="ml-2 text-base font-semibold text-white font-general whitespace-nowrap"
            animate={{ opacity: isHovered || isHome ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ display: isHovered || isHome ? "block" : "none" }}
          >
            Textfully
          </motion.p>
        </div>

        <nav className="flex-1 px-2 py-4 overflow-hidden space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={cn(
                  "w-full h-8 flex items-center rounded-md transition-colors",
                  "hover:bg-zinc-800",
                  selectedMenu === item.label && "bg-zinc-800"
                )}
                onClick={() => setSelectedMenu(item.label)}
              >
                <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <motion.span
                  className="ml-2 text-sm whitespace-nowrap"
                  animate={{ opacity: isHovered || isHome ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: isHovered || isHome ? "block" : "none" }}
                >
                  {item.label}
                </motion.span>
              </button>
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
            <h2 className="font-semibold text-zinc-400">{selectedMenu}</h2>
          </div>

          <nav className="px-2 py-4 w-64 space-y-2">
            {selectedMenuData?.children.map((child, index) => (
              <button
                key={index}
                className="w-full h-8 flex items-center px-3 text-sm hover:bg-zinc-800 rounded-md"
              >
                {child.label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
};
