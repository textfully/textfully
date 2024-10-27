"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import Logo from "@/assets/logo";
import GitHub from "@/assets/icons/socials/github";
import Google from "@/assets/icons/socials/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back to home link */}
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Home
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 pt-16">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 text-[#0A93F6]">
            <Logo />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Log in to Textfully</h1>
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="underline text-zinc-400 hover:brightness-110"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* OAuth buttons */}
        <div className="space-y-4 text-zinc-300">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleGitHubSignIn}
              className="text-sm font-semibold w-full px-3 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-lg border border-zinc-800 flex items-center justify-center space-x-2 transition-colors"
            >
              <GitHub className="w-4 h-4 fill-white" />
              <span>Login with GitHub</span>
            </button>

            <button
              onClick={handleGoogleSignIn}
              className="text-sm font-semibold w-full px-3 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-lg border border-zinc-800 flex items-center justify-center space-x-2 transition-colors"
            >
              <Google className="w-4 h-4 fill-white" />
              <span>Login with Google</span>
            </button>
          </div>

          <button className="text-sm font-semibold w-full px-3 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-lg border border-zinc-800 flex items-center justify-center space-x-2 transition-colors">
            <Lock className="w-4 h-4 stroke-white" />
            <span>Login with SSO</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">OR</span>
          </div>
        </div>

        {/* Sign in form */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#1e1e1e] rounded-lg placeholder:text-gray-600 border border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-[#0A93F6] outline-none transition-colors"
              placeholder="neo@matrix.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm text-gray-400">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-zinc-500 font-medium hover:brightness-110"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#1e1e1e] rounded-lg border border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-[#0A93F6] outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white hover:bg-gray-100 text-black rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Continue
                <span className="ml-2">→</span>
              </>
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="mt-8 text-center text-sm text-gray-400">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-500 hover:text-blue-400">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
