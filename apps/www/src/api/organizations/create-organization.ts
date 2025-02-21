import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";

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
