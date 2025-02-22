export enum APIKeyPermission {
  ALL = "all",
  SEND_ONLY = "send_only",
}

export enum MessageService {
  SMS = "sms",
  IMESSAGE = "imessage",
}

export enum MessageStatus {
  PENDING = "pending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export enum OrganizationRole {
  OWNER = "owner",
  ADMINISTRATOR = "administrator",
  DEVELOPER = "developer",
}

export enum SubscriptionTierType {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
  GROWTH = "growth",
}
