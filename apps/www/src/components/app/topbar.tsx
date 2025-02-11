"use client";

import { getIdentity } from "@/api/identity.ts/get-identity";
import { menuItems } from "@/constants/nav";
import { useAuthContext } from "@/contexts/useAuthContext";
import { MessageCircleMore, FileText, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { useOrganizationContext } from "@/contexts/useOrganizationContext";

export const Topbar = () => {
  const { user } = useAuthContext();
  const { organizations, fetchOrganizations } = useOrganizationContext();
  const pathname = usePathname();

  // Get the current section from the path (e.g. /dashboard/messages/sent -> messages)
  const currentSection = pathname.split("/")[2] || "home";
  const selectedMenuData = menuItems.find((item) => {
    if (currentSection === "home") return item.label === "Home";
    return item.children?.some((child) =>
      child?.path?.includes(`/${currentSection}/`)
    );
  });

  const isHome = currentSection === "home";

  useEffect(() => {
    const win = window as any;
    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }

    const _getIdentity = async () => {
      const identity = await getIdentity();
      console.log(user?.user_metadata);
      win.Featurebase("identify", {
        organization: "textfully",
        email: user?.email,
        name: user?.user_metadata?.name,
        id: user?.id,
        profilePicture: user?.user_metadata?.picture,
        userHash: identity.hash,
      });
    };

    _getIdentity();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user]);

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center px-4">
        <div className="h-full flex items-center">
          <h2 className="font-semibold text-zinc-400">
            {selectedMenuData?.label}
          </h2>
        </div>
        <div
          className={clsx(
            "flex items-center w-full",
            isHome && organizations && organizations.length > 0 ? "justify-between" : "justify-end"
          )}
        >
          {isHome && organizations && organizations.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-x-2 px-2 py-1 rounded-md hover:bg-zinc-800/50 transition-colors">
                <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {organizations[0].name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-zinc-200">
                  {organizations[0].name}
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <span className="px-2 py-2 flex items-center text-zinc-400 text-sm font-medium">
                  Organizations
                </span>
                <DropdownMenuSeparator />
                {organizations?.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    className="flex items-center gap-x-2"
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
          )}
          <div className="flex items-center space-x-2">
            <a
              data-featurebase-link
              href="https://textfully.featurebase.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-3 py-1.5 bg-zinc-800/50 transition-colors rounded-lg flex items-center gap-x-1.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200">
                <MessageCircleMore className="w-4 h-4" />
                <span className="text-sm font-medium">Feedback</span>
              </button>
            </a>

            <Link href="/docs" target="_blank" rel="noopener noreferrer">
              <button className="px-3 py-1.5 transition-colors rounded-lg flex items-center gap-x-1.5 text-zinc-400 hover:text-zinc-200">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Docs</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
