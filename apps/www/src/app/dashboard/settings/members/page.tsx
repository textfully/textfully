"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/use-auth-context";
import { useOrganizationContext } from "@/contexts/use-organization-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  OrganizationMembersTableBodyEmpty,
  OrganizationMembersTableBodySkeleton,
  OrganizationMembersTableHeader,
  OrganizationMembersTableRow,
} from "@/components/app/tables/organization-members-table";
import { fetchOrganizationMembers as _fetchOrganizationMembers } from "@/api/organizations/fetch-members";
import { inviteOrganizationMember } from "@/api/organizations/invite-member";
import { leaveOrganization } from "@/api/organizations/leave-organization";
import { removeMember } from "@/api/organizations/remove-member";
import { OrganizationRole } from "@/types/enums";
import { toast } from "sonner";
import { OrganizationMemberResponse } from "@/types/responses";
import { ORGANIZATION_ROLE } from "@/constants/enums";
import { ORGANIZATION_ROLE_DESCRIPTIONS } from "@/constants/descriptions";
import { Table, TableBody } from "@/components/ui/table";

export default function MembersSettingsPage() {
  const { user, loading } = useAuthContext();
  const { selectedOrganization, setSelectedOrganization } =
    useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [orgMembers, setOrgMembers] = useState<OrganizationMemberResponse[]>(
    []
  );
  const [filteredMembers, setFilteredMembers] = useState<
    OrganizationMemberResponse[]
  >([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<OrganizationRole>(
    OrganizationRole.DEVELOPER
  );
  const [isInviting, setIsInviting] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isInviteMemberDialogOpen, setIsInviteMemberDialogOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveOrgConfirmOpen, setLeaveOrgConfirmOpen] = useState(false);
  const [removeMemberConfirmOpen, setRemoveMemberConfirmOpen] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState<string | null>(null);

  const ownerCount = filteredMembers.filter(
    (member) => member.role === OrganizationRole.OWNER
  ).length;

  useEffect(() => {
    if (!searchQuery) {
      setFilteredMembers(orgMembers);
      return;
    }

    const filtered = orgMembers.filter((member) =>
      member.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchQuery, orgMembers]);

  useEffect(() => {
    if (selectedOrganization) {
      fetchOrganizationMembers(selectedOrganization.id);
    }
  }, [selectedOrganization]);

  useEffect(() => {
    if (!removeMemberConfirmOpen) {
      setRemoveMemberId(null);
    }
  }, [removeMemberConfirmOpen]);

  const fetchOrganizationMembers = async (organizationId: string) => {
    setIsLoading(true);

    try {
      const members = await _fetchOrganizationMembers(organizationId);

      setOrgMembers(members);
      setFilteredMembers(members);
    } catch (error) {
      toast.error("Failed to load organization members. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);

    try {
      if (!selectedOrganization) {
        throw new Error("No organization selected");
      }

      await inviteOrganizationMember(selectedOrganization.id, {
        email: inviteEmail,
        role: inviteRole,
      });

      setInviteEmail("");
      setIsInviteMemberDialogOpen(false);

      fetchOrganizationMembers(selectedOrganization.id);
    } catch (error) {
      toast.error("Failed to invite user. Please try again.");
    } finally {
      setIsInviting(false);
    }
  };

  const handleLeaveOrg = async () => {
    if (!selectedOrganization) return;
    setIsLeaving(true);

    try {
      await leaveOrganization(selectedOrganization.id);
      toast.success("You successfully left the organization");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to leave organization. Please try again.");
    } finally {
      setIsLeaving(false);
      setLeaveOrgConfirmOpen(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!selectedOrganization) return;
    setIsRemoving(true);
    setRemoveMemberId(memberId);
    setRemoveMemberConfirmOpen(true);
  };

  const confirmRemoveMember = async () => {
    if (!selectedOrganization || !removeMemberId) return;

    try {
      await removeMember(selectedOrganization.id, removeMemberId);
      toast.success("The member was successfully removed");
      fetchOrganizationMembers(selectedOrganization.id);
    } catch (error) {
      toast.error("Failed to remove organization member. Please try again.");
    } finally {
      setIsRemoving(false);
      setRemoveMemberConfirmOpen(false);
      setRemoveMemberId(null);
    }
  };

  if (loading || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Input
            placeholder="Filter members"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog
            open={isInviteMemberDialogOpen}
            onOpenChange={setIsInviteMemberDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="b&w">Invite Member</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleInviteUser}>
                <DialogHeader>
                  <DialogTitle>Invite Member</DialogTitle>
                  <DialogDescription>
                    Add a new member to your organization. They'll receive an
                    email invitation to join.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <Select
                      value={inviteRole}
                      onValueChange={(value) =>
                        setInviteRole(value as OrganizationRole)
                      }
                    >
                      <SelectTrigger className="w-full bg-zinc-900">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ORGANIZATION_ROLE).map(
                          ([role, roleName]) => (
                            <SelectItem key={role} value={role}>
                              {roleName}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-zinc-400 mb-2">
                      {ORGANIZATION_ROLE_DESCRIPTIONS[inviteRole].description}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="surface"
                    onClick={() => setIsInviteMemberDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" loading={isInviting}>
                    Send invitation
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <OrganizationMembersTableHeader />
        <TableBody>
          {isLoading ? (
            <OrganizationMembersTableBodySkeleton />
          ) : filteredMembers.length === 0 ? (
            <OrganizationMembersTableBodyEmpty searchQuery={searchQuery} />
          ) : (
            filteredMembers.map((member) => (
              <OrganizationMembersTableRow
                key={member.id}
                member={member}
                currentUserId={user.id}
                onRemove={handleRemoveMember}
                onLeave={() => setLeaveOrgConfirmOpen(true)}
                ownerCount={ownerCount}
              />
            ))
          )}
        </TableBody>
      </Table>

      <div className="text-zinc-400 text-sm">
        {filteredMembers.length > 0 && (
          <>
            {filteredMembers.length} user{filteredMembers.length > 1 ? "s" : ""}
          </>
        )}
      </div>

      <AlertDialog
        open={leaveOrgConfirmOpen}
        onOpenChange={setLeaveOrgConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this organization? You will lose
              access to all organization resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleLeaveOrg();
              }}
              disabled={isLeaving}
            >
              {isLeaving ? "Leaving..." : "Leave"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={removeMemberConfirmOpen}
        onOpenChange={setRemoveMemberConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member from your organization?
              They will lose access to all organization resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmRemoveMember();
              }}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove Member"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
