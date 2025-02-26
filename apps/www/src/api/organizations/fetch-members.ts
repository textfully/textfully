import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { OrganizationMemberResponse } from "@/types/responses";

/**
 * Fetch all members of an organization
 *
 * @param organizationId The ID of the organization
 * @returns A promise that resolves to an array of organization members
 * @throws Error if the fetch fails
 */
export async function fetchOrganizationMembers(
  organizationId: string
): Promise<OrganizationMemberResponse[]> {
  try {
    return await makeApiRequest<OrganizationMemberResponse[]>(
      `${API_BASE_URL}/organizations/${organizationId}/members`,
      {
        errorMessage: "Failed to fetch organization members",
      }
    );
  } catch (error) {
    throw error;
  }
}
