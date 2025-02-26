import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

/**
 * Delete an organization
 *
 * @param organizationId - The ID of the organization to delete
 * @returns A promise that resolves when the organization is deleted
 * @throws Error if the deletion fails
 */
export async function deleteOrganization(
  organizationId: string
): Promise<void> {
  try {
    await makeApiRequest(`${API_BASE_URL}/organizations/${organizationId}`, {
      method: "DELETE",
      errorMessage: "Failed to delete organization",
    });
  } catch (error) {
    throw error;
  }
}
