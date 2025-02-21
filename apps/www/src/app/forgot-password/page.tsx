"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Lock } from "lucide-react";
import Logo from "@/assets/logo";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { resetPasswordForEmail } = useAuthContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(null);

    try {
      const formData: ForgotPasswordFormData = { email };
      const result = forgotPasswordSchema.safeParse(formData);

      if (!result.success) {
        const errors = result.error.errors;
        errors.forEach((error) => {
          if (error.path[0] === "email") {
            setEmailError(error.message);
            emailRef.current?.focus();
          }
        });
        setLoading(false);
        return;
      }

      const { error } = await resetPasswordForEmail(email);

      if (error) {
        setEmailError(error.message);
      } else {
        router.push("/login");
        toast.success(
          "Check your email for the reset password link. The link will expire in 1 hour."
        );
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
          <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
          <p className="text-zinc-400">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={!email}
            className="w-full"
          >
            Send reset email
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
