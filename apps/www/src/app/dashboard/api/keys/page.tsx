"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/utils/helper";
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

interface APIKey {
  id: string;
  name: string;
  shortKey: string;
  createdAt: string;
  lastUsed: string;
}

type APIKeyPermission = "all" | "send_only";

export default function APIKeysPage() {
  const { user, loading } = useAuthContext();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [permission, setPermission] = useState<APIKeyPermission>("all");

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/api/keys"));
    }
  }, [user, loading]);

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API key creation
    console.log("Creating new API key with name:", name);
    setIsModalOpen(false);
    setName("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-zinc-900 rounded-full text-white font-medium text-sm leading-none transition hover:brightness-110"
          >
            Create API Key
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.length === 0 ? (
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
                        {apiKey.shortKey}...
                      </code>
                    </TableCell>
                    <TableCell>
                      {new Date(apiKey.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(apiKey.lastUsed).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-full text-sm hover:brightness-110 transition">
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
            <DialogTitle>Create API Key</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateApiKey} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Production API Key"
                className="w-full px-2.5 py-1.5 text-sm bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
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
                <SelectTrigger className="w-full">
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
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 rounded-md text-white text-sm font-medium hover:brightness-110 transition"
              >
                Create
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
