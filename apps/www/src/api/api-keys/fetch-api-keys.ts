import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { APIKeyResponse } from "@/types/responses";

/**
 * Fetch all API keys
 *
 * @returns A promise that resolves to an array of API keys
 * @throws Error if the fetch fails
 */
export async function fetchApiKeys(): Promise<APIKeyResponse[]> {
  try {
    return await makeApiRequest<APIKeyResponse[]>(`${API_BASE_URL}/api-keys`, {
      errorMessage: "Failed to fetch API keys",
    });
  } catch (error) {
    throw error;
  }
}
