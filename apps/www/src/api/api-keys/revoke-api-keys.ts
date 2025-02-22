import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

export async function revokeApiKey(keyId: string): Promise<void> {
  try {
    await makeApiRequest<null>(`${API_BASE_URL}/api-keys/${keyId}`, {
      method: "DELETE",
      errorMessage: "Failed to revoke API key",
    });
  } catch (error) {
    throw error;
  }
}
