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
import ThreeDots from "@/assets/icons/misc/three-dots";

export const OrganizationMembersTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-24">User</TableHead>
        <TableHead className="flex-1">Name</TableHead>
        <TableHead className="w-80">Email</TableHead>
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
      <TableCell className="w-80">
        <div className="text-zinc-300">{member.email}</div>
      </TableCell>
      <TableCell className="w-48">
        <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-200">
          <span>{ORGANIZATION_ROLE[member.role]}</span>
        </div>
      </TableCell>
      <TableCell className="w-16">
        {shouldShowMenu ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 [&_svg]:size-4"
              >
                <ThreeDots />
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
        ) : (
          <div className="w-8" />
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
          <TableCell className="w-24 h-row-lg">
            <Skeleton className="h-8 w-8 rounded-full" />
          </TableCell>
          <TableCell className="flex-1 h-row-lg">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-80 h-row-lg">
            <Skeleton className="h-4 w-64" />
          </TableCell>
          <TableCell className="w-48 h-row-lg">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="w-16 h-row-lg">
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
