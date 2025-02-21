import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { APIKeyRequest } from "@/types/requests";
import { CreateAPIKeyResponse } from "@/types/responses";

export async function createApiKey(
  request: APIKeyRequest
): Promise<CreateAPIKeyResponse> {
  try {
    return await makeApiRequest<CreateAPIKeyResponse>(
      `${API_BASE_URL}/api-keys`,
      {
        method: "POST",
        body: JSON.stringify(request),
        errorMessage: "Failed to create API key",
      }
    );
  } catch (error) {
    throw error;
  }
}
