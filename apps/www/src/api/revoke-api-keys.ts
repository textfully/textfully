import { API_BASE_URL } from "@/constants/env";
import { getAuthToken } from "@/utils/api-client";

export async function revokeApiKey(keyId: string): Promise<void> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api-keys/${keyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420", // TODO: remove this
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to revoke API key");
    }
  } catch (error) {
    throw error;
  }
}
