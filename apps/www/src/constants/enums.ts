import {
  APIKeyPermission,
  MessageService,
  OrganizationRole,
  SubscriptionTierType,
} from "@/types/enums";
import { MessageStatus } from "@/types/enums";

export const API_KEY_PERMISSION: Record<APIKeyPermission, string> = {
  [APIKeyPermission.ALL]: "All",
  [APIKeyPermission.SEND_ONLY]: "Send Only",
};

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

export const ORGANIZATION_ROLE: Record<OrganizationRole, string> = {
  [OrganizationRole.OWNER]: "Owner",
  [OrganizationRole.ADMINISTRATOR]: "Administrator",
  [OrganizationRole.DEVELOPER]: "Developer",
};

export const SUBSCRIPTION_TIER: Record<SubscriptionTierType, string> = {
  [SubscriptionTierType.FREE]: "Free",
  [SubscriptionTierType.BASIC]: "Basic",
  [SubscriptionTierType.PRO]: "Pro",
  [SubscriptionTierType.GROWTH]: "Growth",
};
