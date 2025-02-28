"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo";
import Link from "next/link";
import { toast } from "sonner";

export default function VerifyPage() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirect_to");

  const errorParam = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  const handleVerify = () => {
    setError(null);

    if (!tokenHash) {
      setError("Invalid verification link");
      return;
    }

    try {
      const url = new URL(
        "https://cvmdumivffqwpeltefws.supabase.co/auth/v1/verify"
      );
      url.searchParams.append("token", tokenHash);
      if (type) {
        url.searchParams.append("type", type);
      }
      if (redirectTo) {
        url.searchParams.append("redirect_to", redirectTo);
      }
      const verifyUrl = url.toString();

      window.location.href = verifyUrl;
    } catch (error) {
      setError("Failed to process verification link");
    }
  };

  useEffect(() => {
    if (errorParam === "access_denied" && errorCode === "otp_expired") {
      toast.error("Email link has expired", {
        description: "Please try again",
      });
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("error");
      nextSearchParams.delete("error_code");
      router.replace(`${pathname}?${nextSearchParams}`);
    }
  }, [errorParam, errorCode, router, pathname, searchParams]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="px-6 py-4">
        <Link
          href="/login"
          className="inline-flex h-8 items-center text-sm text-zinc-400 hover:text-white transition-colors [&_svg]:size-4"
        >
          <ChevronLeft />
          Login
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-4">
            <Link href="/" className="w-10 h-10 text-primary">
              <Logo />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {type === "recovery"
                ? "Reset Your Password"
                : "Verify Your Email"}
            </h1>
            <p className="text-zinc-400">
              {type === "recovery"
                ? "Click the button below to continue to reset your password."
                : "Click the button below to verify your email address."}
            </p>
          </div>

          {error ? (
            <div className="space-y-6">
              <Button
                variant="b&w"
                className="w-full [&_svg]:size-4"
                onClick={() => router.replace("/login")}
              >
                Back to Login
                <ArrowRight />
              </Button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <p className="text-center text-sm text-zinc-500">
                Need help?{" "}
                <Link href="/support" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          ) : (
            <Button
              variant="b&w"
              className="w-full [&_svg]:size-4"
              onClick={handleVerify}
            >
              {type === "recovery"
                ? "Continue"
                : "Verify Email"}
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
