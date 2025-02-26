"use client";

import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/use-auth-context";
import { cn, createRedirectLink } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createApiKey } from "@/api/api-keys/create-api-key";
import { APIKeyPermission } from "@/types/enums";
import { APIKeyResponse } from "@/types/responses";
import { toast } from "sonner";
import { fetchApiKeys } from "@/api/api-keys/fetch-api-keys";
import { revokeApiKey } from "@/api/api-keys/revoke-api-keys";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Copy from "@/assets/icons/misc/copy";
import {
  APIKeysTableBodyEmpty,
  APIKeysTableBodySkeleton,
  APIKeysTableHeader,
  APIKeysTableRow,
} from "@/components/app/tables/api-keys-table";

export default function APIKeysPage() {
  const { user, loading } = useAuthContext();

  const [apiKeys, setApiKeys] = useState<APIKeyResponse[]>([]);
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [permission, setPermission] = useState<APIKeyPermission>(
    APIKeyPermission.ALL
  );
  const [nameError, setNameError] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [isLoadingKeys, setIsLoadingKeys] = useState(true);
  const [keyToRevoke, setKeyToRevoke] = useState<APIKeyResponse | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadApiKeys = async () => {
      if (!loading && user) {
        setIsLoadingKeys(true);
        try {
          const keys = await fetchApiKeys();
          setApiKeys(keys);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load API keys"
          );
        } finally {
          setIsLoadingKeys(false);
        }
      }
    };

    loadApiKeys();
  }, [user, loading]);

  useEffect(() => {
    if (!isModalOpen) {
      setName("");
      setPermission(APIKeyPermission.ALL);
      setNameError("");
      setCreatedApiKey(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (codeRef.current && createdApiKey) {
      codeRef.current.select();
      navigator.clipboard.writeText(createdApiKey);
    }
  }, [createdApiKey]);

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameError("");

    if (!name.trim()) {
      setNameError("Name is required");
      nameRef.current?.focus();
      return;
    }

    setIsCreating(true);

    try {
      const response = await createApiKey({
        name: name.trim(),
        permission,
      });
      setCreatedApiKey(response.api_key);

      const keys = await fetchApiKeys();
      setApiKeys(keys);

      toast.success("API key created successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create API key"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    setIsRevoking(true);
    try {
      await revokeApiKey(keyId);

      const keys = await fetchApiKeys();
      setApiKeys(keys);
      setKeyToRevoke(null);

      toast.success("API key revoked successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to revoke API key"
      );
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <>
      <div className="container p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <Button variant="b&w" onClick={() => setIsModalOpen(true)}>
            Create API Key
          </Button>
        </div>

        <Table>
          <TableHeader>
            <APIKeysTableHeader />
          </TableHeader>
          <TableBody>
            {isLoadingKeys ? (
              <APIKeysTableBodySkeleton />
            ) : apiKeys.length === 0 ? (
              <APIKeysTableBodyEmpty />
            ) : (
              apiKeys.map((apiKey) => (
                <APIKeysTableRow
                  key={apiKey.id}
                  apiKey={apiKey}
                  onRevoke={setKeyToRevoke}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {createdApiKey ? "Save your API key" : "Create API Key"}
            </DialogTitle>
          </DialogHeader>
          {createdApiKey ? (
            <div className="space-y-6 min-w-0">
              <div>
                <p className="text-sm text-zinc-400 mb-4">
                  Please save this API key somewhere safe and accessible. For
                  security reasons, you won't be able to view it again on the
                  dashboard. If you lose this API key, you'll need to generate a
                  new one.
                </p>
                <div className="flex items-center gap-x-2">
                  <input
                    ref={codeRef}
                    readOnly
                    value={createdApiKey}
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 bg-zinc-900 px-3 py-2 rounded-md text-sm block overflow-x-auto whitespace-nowrap hide-scrollbar font-mono focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      codeRef.current?.select();
                      navigator.clipboard.writeText(createdApiKey);
                      toast.success("API key copied to clipboard");
                    }}
                    className="[&_svg]:size-4"
                    title="Copy to clipboard"
                  >
                    <Copy />
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-2">
                  Permissions
                </h3>
                <Select value={permission} disabled>
                  <SelectTrigger className="w-full bg-zinc-900 hover:brightness-110">
                    {permission === APIKeyPermission.ALL
                      ? "Full access"
                      : "Sending access only"}
                  </SelectTrigger>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button variant="b&w" onClick={() => setIsModalOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateApiKey} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Name
                </label>
                <Input
                  ref={nameRef}
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="e.g. Production API Key"
                  className={cn(
                    nameError && "border-red-500 focus:ring-transparent"
                  )}
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-500">{nameError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Permission
                </label>
                <Select
                  value={permission}
                  onValueChange={(value) =>
                    setPermission(value as APIKeyPermission)
                  }
                >
                  <SelectTrigger className="w-full bg-zinc-900">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Full access</SelectItem>
                    <SelectItem value="send_only">Sending access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-x-2">
                <Button
                  type="button"
                  variant="surface"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" loading={isCreating}>
                  Create
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!keyToRevoke}
        onOpenChange={(open) => !open && setKeyToRevoke(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this API key? This action cannot
              be undone. Any applications using this key will immediately lose
              access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setKeyToRevoke(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRevoking}
              onClick={(e) => {
                e.preventDefault();
                if (keyToRevoke) {
                  handleRevokeKey(keyToRevoke.id);
                }
              }}
            >
              {isRevoking ? "Revoking..." : "Revoke Key"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
