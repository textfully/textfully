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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { menuItems } from "@/constants/nav";

export const Sidebar = () => {
  const { user, loading, signOut } = useAuthContext();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const currentSection = pathname.split("/")[2] || "home";
  const selectedMenuData = menuItems.find((item) => {
    if (currentSection === "home") return item.label === "Home";
    return item.children?.some((child) =>
      child?.path?.includes(`/${currentSection}/`)
    );
  });

  const isHome = currentSection === "home";

  const handleSignOut = async () => {
    signOut().then(() => {
      router.push("/login");
    });
  };

  return (
    <div
      className="flex h-full"
      onMouseLeave={() => {
        if (!loading) {
          setHoveredItem(null);
          setIsSubMenuVisible(false);
        }
      }}
    >
      <div className="h-screen border-r border-zinc-800 bg-zinc-950 text-zinc-300 flex flex-col w-64">
        <div className="pt-3 pb-1 flex px-4 overflow-hidden">
          <Link href="/dashboard">
            <div className="flex gap-x-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <div className="w-5 h-5 text-primary">
                  <Logo />
                </div>
              </div>
              <p className="text-base font-semibold text-white font-general whitespace-nowrap">
                Textfully
              </p>
            </div>
          </Link>
        </div>

        <div className="p-2 overflow-hidden">
          <Link href="/dashboard" className="w-full flex items-center">
            <div
              className={cn(
                "flex h-8 items-center w-full rounded-md transition-colors",
                isHome ? "bg-zinc-800" : "hover:bg-zinc-900"
              )}
            >
              <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm whitespace-nowrap">Home</span>
            </div>
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
                className="w-full flex items-center"
              >
                <div
                  className={cn(
                    "w-full h-8 flex items-center rounded-md transition-colors",
                    isSelected ? "bg-zinc-800" : "hover:bg-zinc-900"
                  )}
                  onMouseEnter={() => {
                    if (!loading) {
                      setHoveredItem(item.label);
                      setIsSubMenuVisible(true);
                    }
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
                    {item.icon && <item.icon className="w-4 h-4" />}
                  </div>
                  <span className="ml-2 text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {user && !loading && (
          <div className="p-2 border-t border-zinc-800">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:ring-0 focus:ring-offset-0">
                <div className="w-full p-2 overflow-hidden hover:bg-zinc-800 transition-colors rounded-md">
                  <div className="flex items-center ml-1">
                    <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="ml-2 text-sm text-zinc-400 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                align="start"
                onMouseEnter={() => setHoveredItem(null)}
              >
                <DropdownMenuItem onClick={handleSignOut}>
                  <button className="w-full text-left">Sign out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <motion.div
        className="h-screen border-r border-zinc-800 bg-zinc-950 text-zinc-300 overflow-hidden"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: !loading && hoveredItem && isSubMenuVisible ? 256 : 0,
          opacity: !loading && hoveredItem && isSubMenuVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {hoveredItem && (
          <>
            <div className="h-14 px-4 flex items-center border-b border-zinc-800 w-64">
              <h2 className="font-semibold text-zinc-400">
                {menuItems.find((item) => item.label === hoveredItem)?.label}
              </h2>
            </div>

            <nav className="px-2 py-4 w-64 space-y-2">
              {menuItems
                .find((item) => item.label === hoveredItem)
                ?.children?.map((child, index) => (
                  <Link
                    key={index}
                    href={child.path ?? "/dashboard"}
                    {...(!child.path.startsWith("/dashboard")
                      ? {
                          rel: "noopener noreferrer",
                          target: "_blank",
                        }
                      : {})}
                    className="w-full flex items-center"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between w-full rounded-md h-8 px-3 text-sm",
                        pathname === child.path
                          ? "bg-zinc-800"
                          : "hover:bg-zinc-900"
                      )}
                    >
                      <span>{child.label}</span>
                      {!child.path.startsWith("/dashboard") && (
                        <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                  </Link>
                ))}
            </nav>
          </>
        )}
      </motion.div>
    </div>
  );
};
