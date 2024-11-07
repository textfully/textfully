import { API_BASE_URL } from "@/constants/env";
import { APIKeyRequest } from "@/types/requests";
import { APIKeyResponse } from "@/types/responses";
import { getAuthToken } from "@/utils/api-client";

export async function createApiKey(
  request: APIKeyRequest
): Promise<APIKeyResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api-keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420", // TODO: remove this
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
