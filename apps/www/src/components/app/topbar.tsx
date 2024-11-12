"use client";

import { getIdentity } from "@/api/identity.ts/get-identity";
import { menuItems } from "@/constants/nav";
import { useAuthContext } from "@/contexts/useAuthContext";
import {
  HelpCircle,
  ExternalLink,
  MessageCircleMore,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export const Topbar = () => {
  const { user } = useAuthContext();

  const pathname = usePathname();

  // Get the current section from the path (e.g. /dashboard/messages/sent -> messages)
  const currentSection = pathname.split("/")[2] || "home";
  const selectedMenuData = menuItems.find((item) => {
    if (currentSection === "home") return item.label === "Home";
    return item.children?.some((child) =>
      child?.path?.includes(`/${currentSection}/`)
    );
  });

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

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4">
        <div className="px-4 h-full flex items-center w-64">
          <h2 className="font-semibold text-zinc-400">
            {selectedMenuData?.label}
          </h2>
        </div>
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
    </>
  );
};
