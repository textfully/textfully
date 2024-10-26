'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const navItems = [
  { name: "Pricing", link: "/pricing" },
  { name: "Documentation", link: "/docs" },
  { name: "Blog", link: "/blog" },
];

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">Textfully</Link>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-gray-300 hover:text-white text-sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <Link href="/sign-in" className="text-gray-300 hover:text-white">
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="bg-white hover:bg-gray-300 transition-colors text-black px-4 py-2 rounded-full flex items-center font-medium"
        >
          Get Started <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
}
