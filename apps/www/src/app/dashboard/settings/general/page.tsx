"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/use-auth-context";
import { createRedirectLink, cn } from "@/lib/utils";
import { useOrganizationContext } from "@/contexts/use-organization-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { toast } from "sonner";
import { deleteOrganization } from "@/api/organizations/delete-organization";
import { updateOrganization } from "@/api/organizations/update-organization";
import { CopyField } from "@/components/app/copy-button";
import { Skeleton } from "@/components/ui/skeleton";

export default function GeneralSettingsPage() {
  const { selectedOrganization, setSelectedOrganization, fetchOrganizations } =
    useOrganizationContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [orgName, setOrgName] = useState(selectedOrganization?.name || "");
  const [originalOrgName, setOriginalOrgName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const confirmDeleteNameRef = useRef<HTMLInputElement>(null);

  const isLoading = !selectedOrganization;

  useEffect(() => {
    if (selectedOrganization) {
      setOrgName(selectedOrganization.name);
      setOriginalOrgName(selectedOrganization.name);
    }
  }, [selectedOrganization]);

  useEffect(() => {
    if (isAlertOpen) {
      setTimeout(() => {
        confirmDeleteNameRef.current?.focus();
      }, 100);
    }
  }, [isAlertOpen]);

  const handleDeleteOrganization = async () => {
    if (!selectedOrganization) {
      toast.error("No organization selected");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOrganization(selectedOrganization.id);
      toast.success("Organization deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete organization"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveOrgName = async () => {
    if (!selectedOrganization || !orgName.trim()) {
      return;
    }

    if (orgName === originalOrgName) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);

    try {
      const updatedOrg = await updateOrganization(
        selectedOrganization.id,
        orgName
      );
      setOriginalOrgName(orgName);

      setSelectedOrganization(updatedOrg);

      await fetchOrganizations();

      toast.success("Organization name updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update organization"
      );
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setOrgName(originalOrgName);
    setIsEditing(false);
  };

  const isOwner = selectedOrganization?.role === "owner";
  const isAdmin = selectedOrganization?.role === "administrator";
  const canEditName = isOwner || isAdmin;
  const hasChanges = orgName !== originalOrgName;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your organization details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 mb-2">
                Organization ID
              </label>
              <div className="w-full">
                {isLoading ? (
                  <Skeleton className="h-8 w-full" />
                ) : (
                  <CopyField
                    value={selectedOrganization?.id || "Not available"}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="org-name" className="text-sm font-medium">
                Organization name
              </label>
              <div className="flex flex-col gap-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-full" />
                ) : (
                  <Input
                    id="org-name"
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                      if (!isEditing) setIsEditing(true);
                    }}
                    placeholder="Enter organization name"
                    disabled={!canEditName || isUpdating}
                  />
                )}
                {!isLoading && !canEditName && (
                  <p className="text-xs text-zinc-500">
                    Only organization owners and administrators can edit the
                    name
                  </p>
                )}
              </div>
            </div>
          </div>

          {!isLoading && canEditName && (
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="surface"
                onClick={handleCancelEdit}
                disabled={!hasChanges || isUpdating}
                className="h-8 px-3 text-sm"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveOrgName}
                disabled={!hasChanges || isUpdating}
                loading={isUpdating}
                className="h-8 px-3 text-sm"
              >
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {!isLoading && isOwner && (
        <>
          <Card className="border-red-700">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>
                Once you delete an organization, there is no recovery option.
                Make sure you back up your data before proceeding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={!isOwner}>
                    Delete Organization
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your organization, all your data, and remove your access
                      to all services.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (confirmationText === orgName) {
                        handleDeleteOrganization();
                      }
                    }}
                  >
                    <div className="py-4">
                      <p className="text-sm text-zinc-400 mb-2">
                        Please type <span className="font-bold">{orgName}</span>{" "}
                        to confirm:
                      </p>
                      <Input
                        ref={confirmDeleteNameRef}
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        placeholder={orgName}
                        className="w-full"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting} type="button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        type="submit"
                        disabled={isDeleting || confirmationText !== orgName}
                      >
                        {isDeleting ? "Deleting..." : "Delete Organization"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
