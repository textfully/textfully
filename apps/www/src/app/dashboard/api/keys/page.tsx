"use client";

import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
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
  const [isLoadingKeys, setIsLoadingKeys] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/api/keys"));
    }
  }, [user, loading]);

  useEffect(() => {
    const loadApiKeys = async () => {
      if (!loading && user) {
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
    try {
      await revokeApiKey(keyId);

      const keys = await fetchApiKeys();
      setApiKeys(keys);

      toast.success("API key revoked successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to revoke API key"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="container p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <button onClick={() => setIsModalOpen(true)}>
            <div className="px-4 py-2.5 bg-white rounded-lg text-zinc-900 font-semibold text-sm leading-none transition hover:brightness-110">
              Create API Key
            </div>
          </button>
        </div>

        <div className="overflow-hidden rounded-md border border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 bg-zinc-900">
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingKeys ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-400">
                    Loading API keys...
                  </TableCell>
                </TableRow>
              ) : apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-400">
                    No API keys found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id} className="border-zinc-800">
                    <TableCell>{apiKey.name}</TableCell>
                    <TableCell>
                      <code className="bg-zinc-800 px-2 py-1 rounded">
                        {apiKey.short_key}...
                      </code>
                    </TableCell>
                    <TableCell>
                      {new Date(apiKey.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(apiKey.last_used).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleRevokeKey(apiKey.id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-full text-sm hover:brightness-110 transition"
                      >
                        Revoke
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
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
                  <button
                    onClick={() => {
                      codeRef.current?.select();
                      navigator.clipboard.writeText(createdApiKey);
                      toast.success("API key copied to clipboard");
                    }}
                    className="p-2 hover:bg-zinc-800 rounded-md transition shrink-0"
                    title="Copy to clipboard"
                  >
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
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-2">
                  Permissions
                </h3>
                <Select value={permission} disabled>
                  <SelectTrigger className="w-full bg-zinc-900">
                    {permission === APIKeyPermission.ALL
                      ? "Full access"
                      : "Sending access only"}
                  </SelectTrigger>
                </Select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-primary rounded-md text-white text-sm font-semibold transition hover:brightness-110"
                >
                  Done
                </button>
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
                <input
                  ref={nameRef}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="e.g. Production API Key"
                  className={`w-full px-2.5 py-1.5 text-sm bg-zinc-900 border ${
                    nameError
                      ? "border-red-500 focus:ring-transparent"
                      : "border-zinc-700 focus:ring-zinc-700"
                  } rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2`}
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
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className={`px-4 py-2 bg-primary rounded-md text-white text-sm font-semibold transition ${
                    isCreating
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:brightness-110"
                  }`}
                >
                  {isCreating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
