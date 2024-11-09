import { API_BASE_URL } from "@/constants/env";
import { APIKeyResponse } from "@/types/responses";
import { getAuthToken } from "@/utils/api-client";

export async function fetchApiKeys(): Promise<APIKeyResponse[]> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api-keys`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420", // TODO: remove this
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch API keys");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
