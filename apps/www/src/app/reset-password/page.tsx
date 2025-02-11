"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Lock } from "lucide-react";
import Logo from "@/assets/logo";
import { z } from "zod";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError(null);

    try {
      const formData: ResetPasswordFormData = { password };
      const result = resetPasswordSchema.safeParse(formData);

      if (!result.success) {
        const errors = result.error.errors;
        errors.forEach((error) => {
          if (error.path[0] === "password") {
            setPasswordError(error.message);
            passwordRef.current?.focus();
          }
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setPasswordError(error.message);
      } else {
        router.push("/dashboard");
        toast.success("Password updated successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="px-6 py-4 my-auto">
        <Link
          href="/login"
          className="inline-flex h-8 items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Login
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 p-32">
        <div className="flex justify-center mb-4">
          <Link href="/" className="w-10 h-10 text-primary">
            <Logo />
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
          <p className="text-zinc-400">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
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
              className={`w-full px-3 py-2 bg-[#1e1e1e] rounded-lg placeholder:text-zinc-600 border focus:ring-1 outline-none transition-colors ${
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-800 focus:border-zinc-700 focus:ring-primary"
              }`}
              placeholder="neo@matrix.com"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2 bg-primary hover:brightness-110 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              "Updating..."
            ) : (
              <>
                Update password
                <ArrowRight className="ml-1 w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
