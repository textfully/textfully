import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { MessageResponse } from "@/types/responses";
import { MESSAGE_SERVICE, MESSAGE_STATUS } from "@/constants/enums";
import { PhoneNumberText } from "@/components/app/phone-number-text";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import advanced from "dayjs/plugin/advancedFormat";
import { cn } from "@/lib/utils";
import { MessageService } from "@/types/enums";

dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(advanced);

export const SentMessagesTableHeader = () => {
  return (
    <TableRow>
      <TableHead>Recipient</TableHead>
      <TableHead>Service</TableHead>
      <TableHead>Text</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Sent At</TableHead>
    </TableRow>
  );
};

export const SentMessagesTableRow = ({
  message,
}: {
  message: MessageResponse;
}) => {
  return (
    <TableRow>
      <TableCell className="w-48">
        <PhoneNumberText phoneNumber={message.recipient} />
      </TableCell>
      <TableCell className="w-16">
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
      <TableCell className="flex-1">{message.text}</TableCell>
      <TableCell className="w-24">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            message.status === "delivered"
              ? "bg-green-500/10 text-green-500"
              : message.status === "failed"
                ? "bg-red-500/10 text-red-500"
                : "bg-yellow-500/10 text-yellow-500"
          )}
        >
          {MESSAGE_STATUS[message.status]}
        </span>
      </TableCell>
      <TableCell className="w-72">
        {dayjs(message.sent_at).format("LLL z")}
      </TableCell>
    </TableRow>
  );
};

export const SentMessagesTableHeaderSkeleton = () => {
  return (
    <TableRow>
      <TableHead>
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead>
        <Skeleton className="h-4 w-[76px]" />
      </TableHead>
      <TableHead>
        <Skeleton className="h-4 w-3/4" />
      </TableHead>
      <TableHead>
        <Skeleton className="h-4 w-20" />
      </TableHead>
      <TableHead>
        <Skeleton className="h-4 w-40" />
      </TableHead>
    </TableRow>
  );
};

export const SentMessagesTableBodySkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="w-48">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-16">
            <Skeleton className="h-4 w-[76px]" />
          </TableCell>
          <TableCell className="flex-1">
            <Skeleton className="h-4 w-3/4" />
          </TableCell>
          <TableCell className="w-24">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell className="w-72">
            <Skeleton className="h-4 w-40" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const SentMessagesTableBodyEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center text-zinc-400">
        No messages found.
      </TableCell>
    </TableRow>
  );
};
