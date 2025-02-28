"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Logo from "@/assets/logo";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/use-auth-context";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
        setIsSubmitting(false);
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
      setIsSubmitting(false);
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
          href="/login"
          className="inline-flex h-8 items-center text-sm text-zinc-400 hover:text-white transition-colors [&_svg]:size-4"
        >
          <ChevronLeft />
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
            variant="b&w"
            loading={isSubmitting}
            disabled={!email}
            className="w-full [&_svg]:size-4"
          >
            Send reset email
            <ArrowRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
