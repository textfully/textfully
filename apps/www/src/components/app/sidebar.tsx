"use client";

import {
  ArrowUpRight,
  ChevronDown,
  Code,
  CreditCard,
  Home,
  MessagesSquare,
  Phone,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/useAuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { menuItems } from "@/constants/nav";
import { useOrganizationContext } from "@/contexts/useOrganizationContext";

export const Sidebar = () => {
  const { user, loading, signOut } = useAuthContext();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const {
    organizations,
    fetchOrganizations,
    selectedOrganization,
    setSelectedOrganization,
  } = useOrganizationContext();

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

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user]);

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
        <div className="pt-3 pb-1 flex px-2 overflow-hidden">
          {organizations === undefined ? (
            <div className="h-8 bg-zinc-900 rounded-md w-32" />
          ) : organizations && organizations.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-x-2 px-2 py-1 rounded-md hover:bg-zinc-800/50 transition-colors">
                <div className="w-6 h-6 flex-shrink-0 bg-zinc-800 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-white uppercase">
                    {selectedOrganization?.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-left font-medium text-zinc-200 line-clamp-1">
                  {selectedOrganization?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <span className="px-2 py-2 flex items-center text-zinc-400 text-sm font-medium">
                  Organizations
                </span>
                <DropdownMenuSeparator />
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    className="flex items-center gap-x-2"
                    onClick={() => {
                      setSelectedOrganization(org);
                    }}
                  >
                    <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {org.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{org.name}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="flex items-center gap-x-2 h-9">
                  <div className="flex items-center justify-center w-6 h-6">
                    <Plus className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="text-sm font-medium">New organization</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="flex items-center h-8 gap-x-2 pl-2 pr-4 py-1 rounded-md hover:bg-zinc-800/50 transition-colors">
              <Plus className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-200">
                Create Organization
              </span>
            </button>
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
            <span className="ml-2 text-sm whitespace-nowrap">Home</span>
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
              </Link>
            );
          })}
        </nav>

        {user && !loading && (
          <div className="p-2 border-t border-zinc-800">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:ring-0 focus:ring-offset-0 rounded-md">
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
                    className={cn(
                      "w-full h-8 flex items-center px-3 text-sm rounded-md",
                      pathname === child.path
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-900"
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
          </>
        )}
      </motion.div>
    </div>
  );
};
