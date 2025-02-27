import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

/**
 * Remove a member from an organization
 *
 * @param organizationId - The ID of the organization
 * @param memberId - The ID of the member to remove
 * @returns A promise that resolves when the member is removed
 * @throws Error if the removal fails
 */
export async function removeMember(
  organizationId: string,
  memberId: string
): Promise<void> {
  try {
    await makeApiRequest(
      `${API_BASE_URL}/organizations/${organizationId}/members/${memberId}`,
      {
        method: "DELETE",
        errorMessage: "Failed to remove member",
      }
    );
  } catch (error) {
    throw error;
  }
}
