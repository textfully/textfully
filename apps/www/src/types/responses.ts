import { MessageService, OrganizationRole } from "./enums";

import { MessageStatus } from "./enums";

export interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateAPIKeyResponse {
  api_key: string;
  created_at: string | null;
}

export interface APIKeyResponse {
  id: string;
  organization_id: string;
  user_id: string;
  name: string;
  short_key: string;
  permission: string;
  is_active: boolean;
  last_used: string | null;
  created_at: string | null;
}

export interface MessageResponse {
  id: string;
  organization_id: string;
  user_id: string;
  message_id: string;
  recipient: string;
  text: string;
  service: MessageService;
  status: MessageStatus;
  sent_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  created_at: string | null;
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

export interface OrganizationMemberResponse {
  id: string;
  organization_id: string;
  user_id: string;
  role: OrganizationRole;
  created_at: string | null;
  updated_at: string | null;
  full_name: string;
  email: string;
  avatar_url: string | null;
}

export interface InviteMemberResponse {
  id: string;
  organization_id: string;
  email: string;
  role: string;
  created_at: string | null;
  expires_at: string | null;
}

export interface ContactResponse {
  id: string;
  phone_number: string;
  first_name: string | null;
  last_name: string | null;
  is_subscribed: boolean;
  note: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface HealthCheckResponse {
  status: string;
}
