"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/lib/utils";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMessages } from "@/api/messages/fetch-messages";
import { MessageResponse } from "@/types/responses";
import {
  SentMessagesTableBodyEmpty,
  SentMessagesTableBodySkeleton,
  SentMessagesTableHeader,
  SentMessagesTableHeaderSkeleton,
  SentMessagesTableRow,
} from "@/components/app/tables/sent-messages-table";

export default function SentMessagesPage() {
  const { user, loading } = useAuthContext();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/messages/sent"));
    }
  }, [user, loading]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!loading && user) {
        try {
          const fetchedMessages = await fetchMessages();
          setMessages(fetchedMessages);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load messages"
          );
        } finally {
          setIsLoadingMessages(false);
        }
      }
    };

    loadMessages();
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sent Messages</h1>
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            {isLoadingMessages ? (
              <SentMessagesTableHeaderSkeleton />
            ) : (
              <SentMessagesTableHeader />
            )}
          </TableHeader>
          <TableBody>
            {isLoadingMessages ? (
              <SentMessagesTableBodySkeleton />
            ) : messages.length === 0 ? (
              <SentMessagesTableBodyEmpty />
            ) : (
              messages.map((message) => (
                <SentMessagesTableRow key={message.id} message={message} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
