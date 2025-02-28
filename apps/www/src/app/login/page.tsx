"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, Lock } from "lucide-react";
import Logo from "@/assets/logo";
import GitHub from "@/assets/icons/socials/github";
import Google from "@/assets/icons/socials/google";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/use-auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signInWithPassword, signInWithOAuth } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const redirectTo = searchParams.get("redirectTo");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setEmailError(null);
    setPasswordError(null);

    try {
      const formData: LoginFormData = { email, password };
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        const error = result.error.errors[0];
        if (error.path[0] === "email") {
          setEmailError(error.message);
          emailRef.current?.focus();
        } else if (error.path[0] === "password") {
          setPasswordError(error.message);
          passwordRef.current?.focus();
        }
        setIsLoggingIn(false);
        return;
      }

      const { error } = await signInWithPassword(email, password);

      if (error) {
        if (error.message.toLowerCase().includes("email")) {
          setEmailError(error.message);
          emailRef.current?.focus();
        } else if (error.message.toLowerCase().includes("password")) {
          setPasswordError(error.message);
          passwordRef.current?.focus();
        } else {
          toast.error(error.message);
        }
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const { error } = await signInWithOAuth("github", redirectTo);
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithOAuth("google", redirectTo);
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (errorParam === "access_denied" && errorCode === "otp_expired") {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("error");
      nextSearchParams.delete("error_code");
      nextSearchParams.delete("error_description");
      nextSearchParams.delete("type");
      router.replace(`${pathname}?${nextSearchParams}`);
      setTimeout(() => {
        toast.error("Email link has expired", {
          description: "Please try again",
        });
      }, 500);
    }
  }, [errorParam, errorCode, router, pathname, searchParams]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="px-6 py-4 my-auto">
        <Link
          href="/"
          className="inline-flex h-8 items-center text-sm text-zinc-400 hover:text-white transition-colors [&_svg]:size-4"
          tabIndex={1}
        >
          <ChevronLeft />
          Home
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 pt-16 pb-32">
        <div className="flex justify-center mb-4">
          <Link href="/" className="w-10 h-10 text-primary" tabIndex={2}>
            <Logo />
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Log in to Textfully</h1>
          <p className="text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="underline text-white hover:text-zinc-200"
              tabIndex={3}
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="space-y-4 text-zinc-300">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button
              onClick={handleGitHubSignIn}
              variant="surface"
              className="w-full [&_svg]:size-4 [&_svg]:fill-white"
              tabIndex={4}
            >
              <GitHub />
              Continue with GitHub
            </Button>

            <Button
              onClick={handleGoogleSignIn}
              variant="surface"
              className="w-full [&_svg]:size-4 [&_svg]:fill-white"
              tabIndex={5}
            >
              <Google />
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-950 text-zinc-400">or</span>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-400">
              Email
            </label>
            <Input
              id="email"
              ref={emailRef}
              type="email"
              variant="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                emailError &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              placeholder="neo@matrix.com"
              tabIndex={6}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm text-zinc-400">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-zinc-500 font-medium hover:brightness-110"
                tabIndex={9}
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              ref={passwordRef}
              type="password"
              variant="primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                passwordError &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              tabIndex={7}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <Button
            type="submit"
            variant="b&w"
            loading={isLoggingIn}
            disabled={!email || !password}
            className="w-full [&_svg]:size-4"
            tabIndex={8}
          >
            Continue
            <ArrowRight />
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-400">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="text-zinc-200 hover:brightness-110"
            tabIndex={10}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-zinc-200 hover:brightness-110"
            tabIndex={11}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
