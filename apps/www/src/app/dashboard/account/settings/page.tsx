"use client";

import { useEffect, useState, useRef } from "react";
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
import { deleteUser } from "@/api/users/delete-user";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

/* 
TODO: Need to fix all the loading states, user name, user email, test delete user, update user, change password
 */
export default function AccountSettingsPage() {
  const { user, userInfo, isLoadingUserInfo } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const confirmDeleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAlertOpen) {
      setTimeout(() => {
        confirmDeleteInputRef.current?.focus();
      }, 100);
    }
  }, [isAlertOpen]);

  if (!user) {
    return null;
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("Your account has been deleted");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account"
      );
    } finally {
      setIsDeleting(false);
      setIsAlertOpen(false);
    }
  };

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
              {userInfo?.email || "Not available"}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            {isLoadingUserInfo ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Input
                id="name"
                placeholder="John Doe"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                defaultValue={userInfo?.full_name || ""}
              />
            )}
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
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-red-700">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>
            This is an irreversible action. Once you delete your account, there
            is no recovery option.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and all your data, and remove your access to all
                  services.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (confirmationText.toLowerCase() === "delete") {
                    handleDeleteAccount();
                  }
                }}
              >
                <div className="py-4">
                  <p className="text-sm text-zinc-400 mb-2">
                    Please type <span className="font-bold">delete</span> to
                    confirm:
                  </p>
                  <Input
                    ref={confirmDeleteInputRef}
                    type="text"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    placeholder="delete"
                    className="w-full"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting} type="button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    disabled={
                      isDeleting || confirmationText.toLowerCase() !== "delete"
                    }
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
