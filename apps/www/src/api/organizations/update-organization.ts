import { makeApiRequest } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";
import { API_BASE_URL } from "@/constants/env";

/**
 * Update an organization's name
 *
 * @param organizationId Organization ID
 * @param name New organization name
 * @returns A promise that resolves to the updated organization
 */
export async function updateOrganization(
  organizationId: string,
  name: string
): Promise<OrganizationResponse> {
  return await makeApiRequest<OrganizationResponse>(
    `${API_BASE_URL}/organizations/${organizationId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
      errorMessage: "Failed to update organization",
    }
  );
}
