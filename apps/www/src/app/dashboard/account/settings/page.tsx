"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/use-auth-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingsPage() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="text-sm text-zinc-400 bg-zinc-900 p-2 rounded">
              {user.email || "Not available"}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              id="name"
              placeholder="Your name"
              defaultValue={user.user_metadata?.full_name || ""}
              disabled
              className="bg-zinc-900"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Password &amp; Security</CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="surface"
            className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
            disabled
          >
            Change Password
          </Button>
          <p className="text-xs text-zinc-500">
            Password management coming soon
          </p>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-red-700">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            Delete Account
          </Button>
          <p className="text-xs text-zinc-500 mt-2">
            Account deletion coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
