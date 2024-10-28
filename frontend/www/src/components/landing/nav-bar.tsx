"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion as m } from "framer-motion";
import clsx from "clsx";
import Logo from "@/assets/logo";
import { useAppContext } from "@/contexts/useAppContext";
import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";

interface NavItem {
  name: string;
  link: string;
}

const navItems: NavItem[] = [
  { name: "Pricing", link: "/pricing" },
  // { name: "Docs", link: "/docs" },
  // { name: "Blog", link: "/blog" },
];

interface NavBarProps {
  shouldAnimate?: boolean;
  isFixed?: boolean;
}

export const NavBar = ({
  shouldAnimate = true,
  isFixed = false,
}: NavBarProps) => {
  const { shouldLoadAnimation } = useAppContext();
  const { user } = useAuthContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <m.nav
        initial={
          shouldAnimate && shouldLoadAnimation ? { opacity: 0, y: -20 } : false
        }
        animate={
          shouldAnimate && shouldLoadAnimation ? { opacity: 1, y: 0 } : false
        }
        transition={{ duration: 0.2 }}
        className={clsx(
          "flex items-center justify-between p-4 px-6",
          isFixed && "fixed top-0 left-0 right-0 z-50 bg-black"
        )}
      >
        <div className="flex items-center gap-x-8">
          <Link href="/">
            <div className="flex gap-x-2 items-center">
              <div className="w-5 h-5 text-[#0A93F6]">
                <Logo />
              </div>
              <p className="text-base font-semibold text-white font-general">
                Textfully
              </p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={clsx(
                  "text-sm transition font-medium",
                  pathname === item.link
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-x-4 message-list">
          {user !== undefined && (
            <>
              {user === null && (
                <Link
                  href="/login"
                  className="text-sm font-medium transition text-zinc-400 hover:text-zinc-200"
                >
                  Log in
                </Link>
              )}

              <Link href="/dashboard">
                <div className="shared small sent px-3 py-1.5 flex gap-x-1.5 items-center">
                  <div
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 20%, transparent 55%)",
                    }}
                    className="inset-0 absolute element-dark !rounded-[16px]"
                  >
                    <div className="inset-0 absolute element opacity-70 !rounded-[15px]"></div>
                  </div>
                  <span className="text-sm font-medium">
                    {user ? "Dashboard" : "Get Started"}
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
        <div className="block sm:hidden ml-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex-col flex items-center justify-center w-6 h-6"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <>
                  <rect
                    x="0"
                    y="11"
                    width="24"
                    height="2"
                    rx="1"
                    fill="white"
                    transform="rotate(45 12 12)"
                  />
                  <rect
                    x="0"
                    y="11"
                    width="24"
                    height="2"
                    rx="1"
                    fill="white"
                    transform="rotate(-45 12 12)"
                  />
                </>
              ) : (
                <>
                  <rect y="8" width="24" height="2" rx="1" fill="white" />
                  <rect y="16" width="24" height="2" rx="1" fill="white" />
                </>
              )}
            </svg>
          </button>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <>
        {isFixed && <div className="h-14" />}
        <m.div
          initial={{ y: -500 }}
          animate={{ y: isMenuOpen ? 0 : -1000 }}
          exit={{ y: isMenuOpen ? -500 : 500 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="fixed mt-14 inset-0 bg-black z-10 sm:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center gap-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    "text-xl font-medium transition",
                    pathname === item.link
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {user === null && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-medium transition text-zinc-400 hover:text-zinc-200"
                >
                  Log in
                </Link>
              )}

              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="shared small sent px-4 py-2 flex gap-x-1.5 items-center"
              >
                <span className="text-lg font-medium">
                  {user ? "Dashboard" : "Get Started"}
                </span>
              </Link>
            </div>
          </div>
        </m.div>
      </>
    </>
  );
};
