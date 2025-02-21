import { API_BASE_URL } from "@/constants/env";
import { getAuthToken } from "@/lib/api-client";
import { OrganizationResponse } from "@/types/responses";

export async function createOrganization(name: string): Promise<OrganizationResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/organizations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create organization");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
} 