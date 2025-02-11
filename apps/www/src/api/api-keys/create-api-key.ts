import { API_BASE_URL } from "@/constants/env";
import { APIKeyRequest } from "@/types/requests";
import { CreateAPIKeyResponse } from "@/types/responses";
import { getAuthToken } from "@/lib/api-client";

export async function createApiKey(
  request: APIKeyRequest
): Promise<CreateAPIKeyResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api-keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create API key");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
