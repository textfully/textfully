import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { HealthCheckResponse } from "@/types/responses";

export async function checkHealth(): Promise<HealthCheckResponse> {
  try {
    return await makeApiRequest<HealthCheckResponse>(`${API_BASE_URL}/health`, {
      errorMessage: "Failed to check health",
    });
  } catch (error) {
    throw error;
  }
}
