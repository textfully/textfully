"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/lib/utils";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMessages } from "@/api/messages/fetch-messages";
import { MessageResponse, MessageService } from "@/types/responses";
import { MESSAGE_SERVICE, MESSAGE_STATUS } from "@/constants/messages";
import { PhoneNumberText } from "@/components/app/phone-number-text";

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
            <TableRow className="border-zinc-800 bg-zinc-900">
              <TableHead>Recipient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingMessages ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-400">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-400">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id} className="border-zinc-800">
                  <TableCell className="min-w-48">
                    <PhoneNumberText phoneNumber={message.recipient} />
                  </TableCell>
                  <TableCell className="min-w-16">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        message.service === MessageService.SMS
                          ? "bg-[#34DA52]/10 text-[#34DA52]"
                          : "bg-[#0b93f6]/10 text-[#0b93f6]"
                      }`}
                    >
                      {MESSAGE_SERVICE[message.service]}
                    </span>
                  </TableCell>
                  <TableCell className="min-w-64 w-full">
                    {message.text}
                  </TableCell>
                  <TableCell className="min-w-24">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        message.status === "delivered"
                          ? "bg-green-500/10 text-green-500"
                          : message.status === "failed"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {MESSAGE_STATUS[message.status]}
                    </span>
                  </TableCell>
                  <TableCell className="min-w-56">
                    {new Date(message.sent_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
