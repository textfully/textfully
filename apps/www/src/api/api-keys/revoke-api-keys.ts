import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

/**
 * Revoke an API key
 *
 * @param keyId - The ID of the API key to revoke
 * @returns A promise that resolves when the API key is revoked
 * @throws Error if the revocation fails
 */
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
