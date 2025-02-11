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
  { name: "Docs", link: "/docs" },
  { name: "Pricing", link: "/pricing" },
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
          isFixed && "fixed top-0 left-0 right-0 z-30 bg-zinc-950"
        )}
      >
        <div className="flex items-center gap-x-8">
          <Link href="/">
            <div className="flex gap-x-2 items-center">
              <div className="w-5 h-5 text-primary">
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
            className="flex-col flex items-center justify-center w-5 h-5  "
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <m.rect
                width="24"
                height="2"
                rx="1"
                fill="white"
                animate={{
                  y: isMenuOpen ? 11 : 8,
                  rotate: isMenuOpen ? 45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.3 }}
              />
              <m.rect
                width="24"
                height="2"
                rx="1"
                fill="white"
                animate={{
                  y: isMenuOpen ? 11 : 16,
                  rotate: isMenuOpen ? -45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.3 }}
              />
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
          className="fixed inset-0 bg-zinc-950 z-30 sm:hidden"
        >
          <div className="flex pt-14 flex-col h-full">
            <div className="flex flex-col gap-y-8 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    "text-base font-medium transition",
                    pathname === item.link
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex justify-between items-center pt-6 border-t border-[#252525] gap-6 w-full message-list">
                {user === null ? (
                  <Link
                    href="/login"
                    className="text-base font-medium transition text-zinc-400 hover:text-zinc-200"
                  >
                    Log in
                  </Link>
                ) : (
                  <div />
                )}

                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
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
              </div>
            </div>
          </div>
        </m.div>
      </>
    </>
  );
};
