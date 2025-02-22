import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { APIKeyResponse } from "@/types/responses";

export async function fetchApiKeys(): Promise<APIKeyResponse[]> {
  try {
    return await makeApiRequest<APIKeyResponse[]>(`${API_BASE_URL}/api-keys`, {
      errorMessage: "Failed to fetch API keys",
    });
  } catch (error) {
    throw error;
  }
}
