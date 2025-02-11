import { API_BASE_URL } from "@/constants/env";
import { getAuthToken } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";

export async function fetchOrganizations(): Promise<OrganizationResponse[]> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/organizations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch messages");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
