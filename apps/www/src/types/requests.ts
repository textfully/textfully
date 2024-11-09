import { APIKeyPermission } from "./enums";

export interface APIKeyRequest {
  name: string;
  permission?: APIKeyPermission;
}
