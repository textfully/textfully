export interface CreateAPIKeyResponse {
  api_key: string;
  created_at: string;
}

export interface APIKeyResponse {
  id: string;
  name: string;
  short_key: string;
  permission: string;
  is_active: boolean;
  last_used: string;
  created_at: string;
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

export interface MessageResponse {
  id: string;
  recipient: string;
  text: string;
  service: MessageService;
  status: MessageStatus;
  sent_at: string;
  sms_fallback: boolean;
}

export interface IdentityResponse {
  hash: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ContactResponse {
  id: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}
