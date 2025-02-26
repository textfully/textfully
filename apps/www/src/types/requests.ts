import { APIKeyPermission, OrganizationRole } from "./enums";

export interface APIKeyRequest {
  name: string;
  permission?: APIKeyPermission;
}

export interface InviteMemberRequest {
  email: string;
  role: OrganizationRole;
}
