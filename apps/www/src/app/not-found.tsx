"use client";

import React from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [typedText, setTypedText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          setTypedText("");
          selection.removeAllRanges();
        } else {
          setTypedText((prev) => prev.slice(0, -1));
        }
      } else if (e.key.length === 1) {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          setTypedText(e.key);
          selection.removeAllRanges();
        } else {
          setTypedText((prev) => prev + e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [typedText]);

  useEffect(() => {
    setTypedText("");
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="w-full bg-[#212126] rounded-xl relative">
          <div className="inset-0 absolute element-dark !rounded-xl">
            <div className="inset-0 absolute element opacity-10 !rounded-[11px]"></div>
          </div>
          {/* Window Controls */}
          <div className="w-full flex justify-between items-center h-10 px-4">
            <div className="flex gap-x-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 text-sm text-zinc-400">
              Error
            </div>
            <div className="w-[52px]"></div>
          </div>

          <div className="w-full h-px bg-zinc-900 z-30 relative"></div>
          <div className="w-full flex px-0.5">
            <div className="w-full h-px bg-white/5"></div>
          </div>

          {/* Error Response */}
          <div className="p-4 pb-2">
            <pre className="text-zinc-400 select-none text-sm whitespace-pre-wrap">
              {`{
    "code": 404,
    "error_code": "not_found",
    "msg": "This page could not be found"
}`}
            </pre>
          </div>

          {/* Terminal Content */}
          {/* <div className="p-4 pt-2 w-full">
            <div className="w-full bg-[#2F3037] relative p-4 rounded-[8px]">
              <div className="inset-0 absolute element-dark">
                <div className="inset-0 absolute element opacity-30"></div>
              </div>
              <div className="relative z-10">
                <div className="whitespace-pre-wrap break-all text-sm font-mono">
                  <span className="text-green-400 select-none">
                    textfully@gtfol.inc
                  </span>
                  <span className="text-white mx-1 select-none">:</span>
                  <span className="text-blue-400 select-none">~</span>
                  <span className="text-yellow-500 mx-1 select-none">$</span>
                  <span className="text-zinc-300 ml-1">{typedText}</span>
                  {isLoaded && (
                    <div className="text-zinc-300 ml-0.5 w-2.5 animate-caret-blink inline-block select-none">
                      ▋
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Home button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="select-none">Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
