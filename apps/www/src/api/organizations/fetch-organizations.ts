import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";

/**
 * Fetch all organizations
 *
 * @returns A promise that resolves to an array of organizations
 * @throws Error if the fetch fails
 */
export async function fetchOrganizations(): Promise<OrganizationResponse[]> {
  try {
    return await makeApiRequest<OrganizationResponse[]>(
      `${API_BASE_URL}/organizations`,
      {
        errorMessage: "Failed to fetch organizations",
      }
    );
  } catch (error) {
    throw error;
  }
}
