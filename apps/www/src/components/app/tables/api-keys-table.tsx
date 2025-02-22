import { APIKeyResponse } from "@/types/responses";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const APIKeysTableHeader = () => {
  return (
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>API Key</TableHead>
      <TableHead>Created</TableHead>
      <TableHead>Last Used</TableHead>
      <TableHead></TableHead>
    </TableRow>
  );
};

export const APIKeysTableRow = ({
  apiKey,
  onRevoke,
}: {
  apiKey: APIKeyResponse;
  onRevoke: (apiKey: APIKeyResponse) => void;
}) => {
  return (
    <TableRow>
      <TableCell className="w-64">{apiKey.name}</TableCell>
      <TableCell className="flex-1">
        <code className="bg-zinc-800 px-2 py-1 rounded">
          {apiKey.short_key}...
        </code>
      </TableCell>
      <TableCell className="w-40">
        {apiKey.created_at
          ? new Date(apiKey.created_at).toLocaleDateString()
          : "-"}
      </TableCell>
      <TableCell className="w-40">
        {apiKey.last_used
          ? new Date(apiKey.last_used).toLocaleDateString()
          : "-"}
      </TableCell>
      <TableCell className="w-32">
        <Button variant="destructive-surface" onClick={() => onRevoke(apiKey)}>
          Revoke
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const APIKeysTableHeaderSkeleton = () => {
  return (
    <TableRow>
      <TableHead className="w-64">
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead className="flex-1">
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead className="w-40">
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead className="w-40">
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead className="w-32">
        <Skeleton className="h-4 w-24" />
      </TableHead>
    </TableRow>
  );
};

export const APIKeysTableBodySkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="w-64">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="flex-1">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-40">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-40">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-32">
            <Skeleton className="h-4 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const APIKeysTableBodyEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center text-zinc-400">
        No API keys found. Create one to get started.
      </TableCell>
    </TableRow>
  );
};
