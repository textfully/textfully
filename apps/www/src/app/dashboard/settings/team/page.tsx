"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/use-auth-context";
import { useOrganizationContext } from "@/contexts/use-organization-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { CircleUser, CircleUserRound, Info, Shield, X } from "lucide-react";
import { fetchOrganizationMembers } from "@/api/organizations/fetch-members";
import { inviteOrganizationMember } from "@/api/organizations/invite-member";
import { leaveOrganization } from "@/api/organizations/leave-organization";
import { OrganizationRole } from "@/types/enums";
import { toast } from "sonner";
import { OrganizationMemberResponse } from "@/types/responses";
import { ORGANIZATION_ROLE } from "@/constants/enums";

// Interface for our UI representation of team members
interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  isCurrentUser: boolean;
}

export default function TeamSettingsPage() {
  const { user, loading } = useAuthContext();
  const { selectedOrganization, setSelectedOrganization } =
    useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<OrganizationMemberResponse[]>(
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter members based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMembers(teamMembers);
      return;
    }

    const filtered = teamMembers.filter((member) =>
      member.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchQuery, teamMembers]);

  // Fetch team members when the selected organization changes
  useEffect(() => {
    if (selectedOrganization) {
      fetchTeamMembers(selectedOrganization.id);
    }
  }, [selectedOrganization]);

  const fetchTeamMembers = async (organizationId: string) => {
    setIsLoading(true);

    try {
      const members = await fetchOrganizationMembers(organizationId);

      setTeamMembers(members);
      setFilteredMembers(members);
    } catch (error) {
      toast.error("Failed to load team members. Please try again.");
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

      // Reset form
      setInviteEmail("");
      setIsDialogOpen(false);

      // Refresh the member list
      fetchTeamMembers(selectedOrganization.id);
    } catch (error) {
      toast.error("Failed to invite user. Please try again.");
    } finally {
      setIsInviting(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!selectedOrganization) return;
    if (!window.confirm("Are you sure you want to leave this team?")) return;

    setIsLeaving(true);

    try {
      await leaveOrganization(selectedOrganization.id);
      setSelectedOrganization(null);

      // Redirect to organization selection or dashboard
      redirect("/dashboard");
    } catch (error) {
      toast.error("Failed to leave team. Please try again.");
    } finally {
      setIsLeaving(false);
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">Invite</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleInviteUser}>
                <DialogHeader>
                  <DialogTitle>Invite team member</DialogTitle>
                  <DialogDescription>
                    Add a new member to your team. They'll receive an email
                    invitation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      className="flex w-full h-9 border px-3 py-2 text-sm rounded-md bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                      value={inviteRole}
                      onChange={(e) =>
                        setInviteRole(e.target.value as OrganizationRole)
                      }
                    >
                      <option value={OrganizationRole.DEVELOPER}>
                        Developer
                      </option>
                      <option value={OrganizationRole.ADMINISTRATOR}>
                        Administrator
                      </option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="surface"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={isInviting}>
                    Send invitation
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="surface"
            onClick={handleLeaveTeam}
            loading={isLeaving}
          >
            Leave team
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Avatar</TableHead>
            <TableHead className="flex-1">User</TableHead>
            <TableHead className="w-64">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-zinc-500">
                Loading team members...
              </TableCell>
            </TableRow>
          ) : filteredMembers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-zinc-500">
                {searchQuery
                  ? "No members found matching your search"
                  : "No team members found"}
              </TableCell>
            </TableRow>
          ) : (
            filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="text-center w-24">
                  {member.avatar_url ? (
                    <div className="inline-flex items-center justify-center">
                      <img
                        src={member.avatar_url}
                        alt={`${member.full_name}'s avatar`}
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-zinc-200 uppercase mx-auto">
                      {member.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </TableCell>
                <TableCell className="flex-1">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <span>{member.full_name}</span>
                      {member.user_id === user?.id && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full select-none">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-64">
                  <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-200">
                    <span>{ORGANIZATION_ROLE[member.role]}</span>
                  </div>
                </TableCell>
              </TableRow>
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
    </div>
  );
}
