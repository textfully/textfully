"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useAppContext } from "@/contexts/useAppContext";
import Logo from "@/assets/logo";

const navItems = [
  { name: "Pricing", link: "/pricing" },
  { name: "Docs", link: "/docs" },
  // { name: "Blog", link: "/blog" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 pl-8"
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
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-x-4 message-list">
        <Link
          href="/sign-in"
          className="text-sm  font-medium transition text-gray-400 hover:text-gray-200"
        >
          Sign in
        </Link>

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
            <span className="text-sm font-medium">Get Started</span>
          </div>
        </Link>
      </div>
    </motion.nav>
  );
}
