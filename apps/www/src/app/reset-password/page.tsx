"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Logo from "@/assets/logo";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/use-auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  const { updatePassword, user, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
        setIsSubmitting(false);
        return;
      }

      const { error } = await updatePassword(password);

      if (error) {
        setPasswordError(error.message);
      } else {
        router.replace("/login");
        setTimeout(() => {
          toast.success("The password was successfully updated");
        }, 500);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      setEmail(user.email || "");
    }
  }, [user, loading]);

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
          <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
          <p className="text-zinc-400">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="hidden">
            <Input id="email" value={email} />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-zinc-400">
              Password
            </label>
            <Input
              id="password"
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="primary"
              placeholder="Enter your new password"
              className={cn(
                passwordError &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="b&w"
            disabled={!password}
            loading={isSubmitting}
            className="w-full [&_svg]:size-4"
          >
            Update password
            <ArrowRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
