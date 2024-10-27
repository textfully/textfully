"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import React from "react";
import { useEffect, useState } from "react";
import { Home, RotateCw } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import { logError } from "@/utils/logger";

import "@/styles/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [currentTime, setCurrentTime] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toUTCString());
  }, []);

  useEffect(() => {
    logError(error);
  }, [error]);

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

  const handleReload = () => {
    setIsSpinning(true);
    reset();
  };

  return (
    <html>
      <body
        className={clsx(
          "font-inter min-h-screen antialiased bg-black text-white",
          inter.variable
        )}
      >
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden font-mono text-sm">
              {/* Window Controls */}
              <div className="flex justify-between items-center p-4 border-b border-[#2a2a2a] h-12">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#dd0300]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffb323]" />
                  <div className="w-3 h-3 rounded-full bg-[#00ac5c]" />
                </div>
                <button
                  onClick={handleReload}
                  className="px-4 py-1 font-medium text-sm font-inter bg-[#dd0300] hover:bg-[#ff0400] text-white rounded-md transition-colors flex items-center"
                >
                  <RotateCw
                    className={`w-4 h-4 mr-1 ${isSpinning ? "animate-spin" : ""}`}
                  />
                  <span>Retry</span>
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 bg-[#1e1e1e] space-y-2">
                <div className="space-y-1 text-gray-300">
                  {/* Header lines */}
                  <p className="select-none">HTTP/1.1 400 Bad Request</p>
                  <p className="select-none">Date: {currentTime}</p>
                  <p className="select-none">Content-Type: application/json</p>
                  <p className="select-none">{`Content-Length: ${error.message ? 41 + error.message.length : 66}`}</p>
                  <p className="select-none">Connection: keep-alive</p>
                  <p className="select-none">&nbsp;</p>

                  {/* JSON content */}
                  <pre className="text-yellow-300 select-none">
                    {`{
    "error": "Bad Request",
    "message": "${error.message ?? "An unknown error occurred"}"
}`}
                  </pre>

                  <p className="select-none">&nbsp;</p>
                  <div className="whitespace-pre-wrap break-all">
                    <span className="text-green-400 select-none">
                      textfully@gtfol.inc
                    </span>
                    <span className="text-white mx-1 select-none">:</span>
                    <span className="text-blue-400 select-none">~</span>
                    <span className="text-white mx-1 select-none">$</span>
                    <span className="text-gray-300 ml-1">{typedText}</span>
                    {isLoaded && (
                      <div className="text-gray-300 ml-0.5 w-2.5 animate-caret-blink inline-block select-none">
                        ▋
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
      </body>
    </html>
  );
}
