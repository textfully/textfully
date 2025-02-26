import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { InviteMemberResponse } from "@/types/responses";
import { InviteMemberRequest } from "@/types/requests";

/**
 * Invite a new member to an organization
 *
 * @param organizationId The ID of the organization
 * @param request The invitation request containing email and role
 * @returns A promise that resolves to the invite details
 * @throws Error if the invitation fails
 */
export async function inviteOrganizationMember(
  organizationId: string,
  request: InviteMemberRequest
): Promise<InviteMemberResponse> {
  try {
    return await makeApiRequest<InviteMemberResponse>(
      `${API_BASE_URL}/organizations/${organizationId}/invites`,
      {
        method: "POST",
        body: JSON.stringify(request),
        errorMessage: "Failed to invite member",
      }
    );
  } catch (error) {
    throw error;
  }
}
