"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Google from "@/assets/icons/socials/google";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo";
import GitHub from "@/assets/icons/socials/github";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    try {
      const formData: SignupFormData = {
        name,
        email,
        password,
        confirmPassword,
      };
      const result = signupSchema.safeParse(formData);
      if (!result.success) {
        const error = result.error.errors[0];
        if (error.path[0] === "name") {
          setNameError(error.message);
          nameRef.current?.focus();
        } else if (error.path[0] === "email") {
          setEmailError(error.message);
          emailRef.current?.focus();
        } else if (error.path[0] === "password") {
          setPasswordError(error.message);
          passwordRef.current?.focus();
        } else if (error.path[0] === "confirmPassword") {
          setConfirmPasswordError(error.message);
          confirmPasswordRef.current?.focus();
        }
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

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
        toast.success("Please check your email to verify your account");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <div className="my-auto px-6 py-4">
        <Link
          href="/"
          className="inline-flex h-8 items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Home
        </Link>
      </div>

      <div className="mx-auto max-w-md px-4 pb-32 pt-16">
        <div className="mb-4 flex justify-center">
          <Link href="/" className="w-10 h-10 text-primary">
            <Logo />
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">Sign up for Textfully</h1>
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary underline hover:text-primary/90"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="space-y-4 text-zinc-300">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleGitHubSignIn}
              className="text-sm font-semibold w-full px-3 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-lg border border-zinc-800 flex items-center justify-center space-x-2 transition-colors"
            >
              <GitHub className="w-4 h-4 fill-white" />
              <span>Continue with GitHub</span>
            </button>

            <button
              onClick={handleGoogleSignIn}
              className="group flex w-full items-center justify-center space-x-2 rounded-lg border border-zinc-800 bg-[#1e1e1e] hover:bg-[#2a2a2a] px-3 py-2 text-sm font-semibold transition-colors"
            >
              <Google className="h-4 w-4 fill-white" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-zinc-950 px-2 text-zinc-400">or</span>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-zinc-400">
              Full Name
            </label>
            <input
              id="name"
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#1e1e1e] px-3 py-2 outline-none transition-colors placeholder:text-zinc-600 focus:ring-1",
                nameError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-800 focus:border-zinc-700 focus:ring-primary"
              )}
              placeholder="Michael Scott"
            />
            {nameError && (
              <p className="text-red-500 mt-1 text-sm">{nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-400">
              Email
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#1e1e1e] px-3 py-2 outline-none transition-colors placeholder:text-zinc-600 focus:ring-1",
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-800 focus:border-zinc-700 focus:ring-primary"
              )}
              placeholder="neo@matrix.com"
            />
            {emailError && (
              <p className="text-red-500 mt-1 text-sm">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-zinc-400">
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#1e1e1e] px-3 py-2 outline-none transition-colors placeholder:text-zinc-600 focus:ring-1",
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-800 focus:border-zinc-700 focus:ring-primary"
              )}
            />
            {passwordError && (
              <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-zinc-400"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              ref={confirmPasswordRef}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#1e1e1e] px-3 py-2 outline-none transition-colors placeholder:text-zinc-600 focus:ring-1",
                confirmPasswordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-800 focus:border-zinc-700 focus:ring-primary"
              )}
            />
            {confirmPasswordError && (
              <p className="text-red-500 mt-1 text-sm">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading || !email || !password || !name || !confirmPassword
            }
            className="flex w-full items-center justify-center rounded-lg bg-white py-2 font-medium text-black transition-colors hover:bg-zinc-100 disabled:opacity-50"
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                Create account
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-zinc-200 hover:brightness-110">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-zinc-200 hover:brightness-110">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
