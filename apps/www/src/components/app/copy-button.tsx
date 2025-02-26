"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";

interface CopyFieldProps {
  value: string;
  className?: string;
}

export function CopyField({ value, className }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-zinc-700/50 bg-zinc-900/50 pr-1.5 select-none",
        className
      )}
    >
      <div className="flex-1 px-3 py-2 text-zinc-400 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
        {value}
      </div>
      <Button
        onClick={copyToClipboard}
        variant="surface"
        className="px-3 py-1 h-full border border-zinc-700 hover:bg-zinc-800 flex items-center gap-1 text-xs text-zinc-300 [&_svg]:size-4"
      >
        <Copy />
        <span>{copied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  );
}
