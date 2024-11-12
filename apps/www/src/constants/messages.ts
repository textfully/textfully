import { MessageService, MessageStatus } from "@/types/responses";

export const MESSAGE_STATUS: Record<MessageStatus, string> = {
  [MessageStatus.PENDING]: "Pending",
  [MessageStatus.SENT]: "Sent",
  [MessageStatus.DELIVERED]: "Delivered",
  [MessageStatus.READ]: "Read",
  [MessageStatus.FAILED]: "Failed",
};

export const MESSAGE_SERVICE: Record<MessageService, string> = {
  [MessageService.SMS]: "SMS",
  [MessageService.IMESSAGE]: "iMessage",
};
