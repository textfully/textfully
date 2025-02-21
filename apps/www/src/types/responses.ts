export interface CreateAPIKeyResponse {
  api_key: string;
  created_at: string | null;
}

export interface APIKeyResponse {
  id: string;
  name: string;
  short_key: string;
  permission: string;
  is_active: boolean;
  last_used: string | null;
  created_at: string | null;
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
  sent_at: string | null;
  sms_fallback: boolean;
}

export interface IdentityResponse {
  hash: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  role: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ContactResponse {
  id: string;
  phone_number: string;
  created_at: string | null;
  updated_at: string | null;
}
