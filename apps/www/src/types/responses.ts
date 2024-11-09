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
