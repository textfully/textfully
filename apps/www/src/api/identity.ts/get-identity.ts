import { API_BASE_URL } from "@/constants/env";
import { getAuthToken } from "@/utils/api-client";
import { IdentityResponse } from "@/types/responses";

export async function getIdentity(): Promise<IdentityResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/identity`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch identity");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
