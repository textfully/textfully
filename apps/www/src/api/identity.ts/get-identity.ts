import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { IdentityResponse } from "@/types/responses";

/**
 * Get the Featurebase identity of the current user
 *
 * @returns A promise that resolves to the Featurebase identity of the current user
 * @throws Error if the fetch fails
 */
export async function getIdentity(): Promise<IdentityResponse> {
  try {
    return await makeApiRequest<IdentityResponse>(`${API_BASE_URL}/identity`, {
      errorMessage: "Failed to fetch identity",
    });
  } catch (error) {
    throw error;
  }
}
