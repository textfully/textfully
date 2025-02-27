"use client";

import { getIdentity } from "@/api/identity.ts/get-identity";
import { additionalItems, menuItems } from "@/constants/nav";
import { useAuthContext } from "@/contexts/use-auth-context";
import { useOrganizationContext } from "@/contexts/use-organization-context";
import { MessageCircleMore, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export const Topbar = () => {
  const { user } = useAuthContext();
  const { selectedOrganization } = useOrganizationContext();

  const pathname = usePathname();

  // Get the current section from the path (e.g. /dashboard/messages/sent -> messages)
  const currentSection = pathname.split("/")[2] || "home";

  const getPageTitle = () => {
    // Handle root dashboard
    if (currentSection === "home") {
      return "Home";
    }

    // Check for direct matches in menuItems first (for items without children)
    const directMenuItem = menuItems.find((item) =>
      item.path?.includes(`/${currentSection}/`)
    );
    if (directMenuItem) {
      return directMenuItem.label;
    }

    // Check for matches in menuItems children
    const matchingMenuItem = menuItems.find((item) =>
      item.children?.some((child) =>
        child?.path?.includes(`/${currentSection}/`)
      )
    );

    // Check for matches in additionalItems
    const matchingAdditionalItem = additionalItems.find((item) =>
      item.path?.includes(`/${currentSection}/`)
    );

    return matchingMenuItem?.label || matchingAdditionalItem?.label || "Home";
  };

  const pageTitle = getPageTitle();

  useEffect(() => {
    if (!user || !selectedOrganization) return;

    const win = window as any;
    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }

    const _getIdentity = async () => {
      const identity = await getIdentity();
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
  }, [user, selectedOrganization]);

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center px-4">
        <div className="h-full w-full flex items-center">
          <h2 className="font-semibold text-zinc-400 line-clamp-1">
            {pageTitle}
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <a
              data-featurebase-link
              href="https://textfully.featurebase.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg"
            >
              <div className="px-3 py-1.5 bg-zinc-800/50 transition-colors rounded-lg flex items-center gap-x-1.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200">
                <MessageCircleMore className="w-4 h-4" />
                <span className="text-sm font-medium">Feedback</span>
              </div>
            </a>

            <Link
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg"
            >
              <div className="px-3 py-1.5 transition-colors rounded-lg flex items-center gap-x-1.5 text-zinc-400 hover:text-zinc-200">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Docs</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
