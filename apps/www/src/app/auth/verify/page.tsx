"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/use-auth-context";

export default function VerifyPage() {
  const { user, loading } = useAuthContext();

  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirect_to");

  const errorParam = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  const handleVerify = () => {
    setError(null);

    if (!token) {
      setError("Invalid verification link");
      return;
    }

    try {
      const url = new URL(
        "https://cvmdumivffqwpeltefws.supabase.co/auth/v1/verify"
      );
      url.searchParams.append("token", token);
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
      setTimeout(() => {
        if (type === "email") {
          router.replace("/signup");
        } else if (type === "recovery") {
          router.replace("/forgot-password");
        } else {
          router.replace("/login");
        }
        toast.error("Email link has expired", {
          description: "Please try again",
        });
      }, 500);
    }
  }, [errorParam, errorCode, router, type]);

  useEffect(() => {
    if (!loading && user) {
      redirect("/dashboard");
    }
  }, [user, loading]);

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
            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-zinc-400">
              Click the button below to verify your email address and continue.
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
              Verify Email
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
