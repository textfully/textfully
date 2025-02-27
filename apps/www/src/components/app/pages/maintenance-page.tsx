"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo";
import { ArrowRight } from "lucide-react";

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-4">
            <Link href="/" className="w-10 h-10 text-primary">
              <Logo />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Under Maintenance</h1>
            <p className="text-zinc-400">
              We're currently performing some maintenance on our servers. We'll
              be back online shortly.
            </p>
          </div>

          <div className="space-y-6">
            <Link href="/support">
              <Button variant="b&w" className="w-full [&_svg]:size-4">
                Contact Support
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
