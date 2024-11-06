"use client";

import {
  MessageSquare,
  HelpCircle,
  ExternalLink,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";

export const Topbar = () => {
  return (
    <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-end px-4">
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1.5 bg-zinc-800/50 transition-colors rounded-lg flex items-center gap-x-1.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200">
          <MessageCircleMore className="w-4 h-4" />
          <span className="text-sm font-medium">Feedback</span>
        </button>

        <button className="px-3 py-1.5 transition-colors rounded-lg flex items-center gap-x-1.5 text-zinc-400 hover:text-zinc-200">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Help</span>
        </button>

        <Link href="/docs">
          <button className="px-3 py-1.5 transition-colors rounded-lg flex items-center gap-x-1.5 text-zinc-400 hover:text-zinc-200">
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">Docs</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
