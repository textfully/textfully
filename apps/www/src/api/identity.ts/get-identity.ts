import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { IdentityResponse } from "@/types/responses";

export async function getIdentity(): Promise<IdentityResponse> {
  try {
    return await makeApiRequest<IdentityResponse>(`${API_BASE_URL}/identity`, {
      errorMessage: "Failed to fetch identity",
    });
  } catch (error) {
    throw error;
  }
}
