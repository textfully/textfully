"use client";

import { ArrowUpRight, ChevronDown, Home, Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "@/contexts/use-auth-context";
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
} from "../../ui/dropdown-menu";
import { MENU_ITEMS } from "@/constants/nav";
import { useOrganizationContext } from "@/contexts/use-organization-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { createOrganization } from "@/api/organizations/create-organization";
import { toast } from "sonner";
import { OrganizationResponse } from "@/types/responses";
import { Skeleton } from "../../ui/skeleton";

export const Sidebar = () => {
  const { user, loading, signOut } = useAuthContext();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [nameError, setNameError] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    organizations,
    fetchOrganizations,
    selectedOrganization,
    setSelectedOrganization,
    isLoadingOrganization,
  } = useOrganizationContext();

  const pathname = usePathname();
  const router = useRouter();

  const currentSection = pathname.split("/")[2] || "home";
  const selectedMenuData = MENU_ITEMS.find((item) => {
    if (currentSection === "home") return item.label === "Home";
    
    if (item.path && item.path.includes(`/${currentSection}/`)) {
      return true;
    }
    
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

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameError("");

    if (!newOrgName.trim()) {
      setNameError("Name is required");
      return;
    }

    setIsCreating(true);

    try {
      const org = await createOrganization(newOrgName.trim());
      await fetchOrganizations();
      setSelectedOrganization(org);
      setIsCreateOrgModalOpen(false);
      setNewOrgName("");

      toast.success("The organization was successfully created");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create organization"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectOrganization = (org: OrganizationResponse) => () => {
    setSelectedOrganization(org);
    window.location.reload();
  };

  useEffect(() => {
    if (isCreateOrgModalOpen) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isCreateOrgModalOpen]);

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
        <div
          className={cn(
            "flex px-2 overflow-hidden",
            organizations && organizations.length > 0 ? "pt-3 pb-1" : "pt-1.5"
          )}
        >
          {organizations && organizations.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <Button className="flex items-center gap-x-2 px-2 py-1 rounded-md hover:bg-zinc-800/50 transition-colors [&_svg]:size-4 [&_svg]:text-zinc-400">
                  <div className="w-6 h-6 flex-shrink-0 bg-zinc-800 rounded flex items-center justify-center">
                    <span className="text-sm font-medium text-white uppercase">
                      {selectedOrganization?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-left font-medium text-zinc-200 line-clamp-1">
                    {selectedOrganization?.name}
                  </span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <span className="px-2 py-2 flex items-center text-zinc-400 text-sm font-medium">
                  Organizations
                </span>
                <DropdownMenuSeparator />
                {organizations.map((org) => (
                  <DropdownMenuItem key={org.id} asChild={true}>
                    <button
                      className="flex items-center gap-x-2 w-full"
                      onClick={handleSelectOrganization(org)}
                    >
                      <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {org.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{org.name}</span>
                    </button>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild={true}>
                  <button
                    className="flex items-center gap-x-2 h-9 w-full"
                    onClick={() => setIsCreateOrgModalOpen(true)}
                  >
                    <div className="flex items-center justify-center w-6 h-6">
                      <Plus className="w-4 h-4 text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium">
                      New organization
                    </span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="p-2 overflow-hidden">
          <Link
            href="/dashboard"
            className={cn(
              "w-full h-8 flex items-center rounded-md transition-colors",
              isHome ? "bg-zinc-800" : "hover:bg-zinc-900"
            )}
            onMouseEnter={() => {
              if (!loading) {
                setHoveredItem("Home");
                setIsSubMenuVisible(false);
              }
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center ml-2 shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">Home</span>
          </Link>
        </div>

        <div className="mx-4 h-px bg-zinc-800" />

        <nav className="flex-1 px-2 py-4 overflow-hidden space-y-2">
          {MENU_ITEMS.map((item, index) => {
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
                    const menuItem = MENU_ITEMS.find(
                      (m) => m.label === item.label
                    );
                    setIsSubMenuVisible(!!menuItem?.children?.length);
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
              <DropdownMenuTrigger asChild={true}>
                <Button className="w-full rounded-md">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                align="start"
                onMouseEnter={() => setHoveredItem(null)}
              >
                <DropdownMenuItem asChild={true}>
                  <Link href="/dashboard/account/settings" className="w-full">
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild={true}>
                  <button onClick={handleSignOut} className="w-full text-left">
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <Dialog
        open={isCreateOrgModalOpen}
        onOpenChange={setIsCreateOrgModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateOrganization} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                ref={nameInputRef}
                value={newOrgName}
                onChange={(e) => {
                  setNewOrgName(e.target.value);
                  setNameError("");
                }}
                placeholder="e.g. My Organization"
                className={cn(
                  nameError && "border-red-500 focus:ring-transparent"
                )}
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-500">{nameError}</p>
              )}
            </div>
            <div className="flex justify-end gap-x-2">
              <Button
                type="button"
                variant="surface"
                onClick={() => setIsCreateOrgModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={isCreating}>
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <motion.div
        className="h-screen border-r border-zinc-800 bg-zinc-950 text-zinc-300 overflow-hidden"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: !loading && hoveredItem && isSubMenuVisible ? 256 : 0,
          opacity: !loading && hoveredItem && isSubMenuVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {hoveredItem && isSubMenuVisible && (
          <>
            <div className="h-14 px-4 flex items-center border-b border-zinc-800 w-64">
              <h2 className="font-semibold text-zinc-400">
                {MENU_ITEMS.find((item) => item.label === hoveredItem)?.label}
              </h2>
            </div>

            <nav className="px-2 py-4 w-64 space-y-2">
              {MENU_ITEMS
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
