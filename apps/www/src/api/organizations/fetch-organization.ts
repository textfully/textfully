import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

import { OrganizationResponse } from "@/types/responses";

/**
 * Fetch a single organization by ID
 *
 * @param id The organization ID to fetch
 * @returns A promise that resolves to an organization
 * @throws Error if the fetch fails
 */
export async function fetchOrganizationById(
  id: string
): Promise<OrganizationResponse> {
  try {
    return await makeApiRequest<OrganizationResponse>(
      `${API_BASE_URL}/organizations/${id}`,
      {
        errorMessage: "Failed to fetch organization",
      }
    );
  } catch (error) {
    throw error;
  }
}
