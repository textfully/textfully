import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";

/**
 * Create a new organization
 *
 * @param name - The name of the organization to create
 * @returns A promise that resolves to the created organization
 * @throws Error if the creation fails
 */
export async function createOrganization(
  name: string
): Promise<OrganizationResponse> {
  try {
    return await makeApiRequest<OrganizationResponse>(
      `${API_BASE_URL}/organizations`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
        errorMessage: "Failed to create organization",
      }
    );
  } catch (error) {
    throw error;
  }
}
