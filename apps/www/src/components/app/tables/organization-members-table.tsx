import { OrganizationMemberResponse } from "@/types/responses";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ORGANIZATION_ROLE } from "@/constants/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizationRole } from "@/types/enums";

export const OrganizationMembersTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-24">User</TableHead>
        <TableHead className="flex-1">Name</TableHead>
        <TableHead className="w-64">Email</TableHead>
        <TableHead className="w-48">Role</TableHead>
        <TableHead className="w-16"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export const OrganizationMembersTableRow = ({
  member,
  currentUserId,
  onRemove,
  onLeave,
  ownerCount,
}: {
  member: OrganizationMemberResponse;
  currentUserId: string;
  onRemove: (memberId: string) => void;
  onLeave: () => void;
  ownerCount: number;
}) => {
  const isCurrentUserOwner =
    member.user_id === currentUserId && member.role === OrganizationRole.OWNER;
  const shouldShowMenu = isCurrentUserOwner && ownerCount > 1;

  return (
    <TableRow key={member.id}>
      <TableCell className="w-24">
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
            {member.user_id === currentUserId && (
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full select-none">
                You
              </span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-64">
        <div className="text-zinc-300">{member.email}</div>
      </TableCell>
      <TableCell className="w-48">
        <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-200">
          <span>{ORGANIZATION_ROLE[member.role]}</span>
        </div>
      </TableCell>
      <TableCell className="w-16">
        {shouldShowMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {member.user_id === currentUserId ? (
                <DropdownMenuItem variant="destructive" onClick={onLeave}>
                  Leave organization
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRemove(member.id)}>
                  Remove member
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
};

export const OrganizationMembersTableBodySkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="w-24">
            <Skeleton className="h-8 w-8 rounded-full" />
          </TableCell>
          <TableCell className="flex-1">
            <Skeleton className="h-5 w-32" />
          </TableCell>
          <TableCell className="w-64">
            <Skeleton className="h-5 w-40" />
          </TableCell>
          <TableCell className="w-48">
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell className="w-16">
            <Skeleton className="invisible h-8 w-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const OrganizationMembersTableBodyEmpty = ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
        {searchQuery
          ? "No members found matching your search"
          : "No organization members found. Invite a member to get started."}
      </TableCell>
    </TableRow>
  );
};
