import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

/**
 * Leave an organization (remove yourself as a member)
 * 
 * @param organizationId The ID of the organization to leave
 * @returns A promise that resolves when the operation succeeds
 * @throws Error if the operation fails
 */
export async function leaveOrganization(
  organizationId: string
): Promise<void> {
  try {
    await makeApiRequest<void>(
      `${API_BASE_URL}/organizations/${organizationId}/leave`,
      {
        method: "POST",
        errorMessage: "Failed to leave organization",
      }
    );
  } catch (error) {
    throw error;
  }
} 