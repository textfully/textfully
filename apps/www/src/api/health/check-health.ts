import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { HealthCheckResponse } from "@/types/responses";

/**
 * Check the health of the API
 *
 * @returns A promise that resolves when the health check is complete
 * @throws Error if the health check fails
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
  try {
    return await makeApiRequest<HealthCheckResponse>(`${API_BASE_URL}/health`, {
      errorMessage: "Failed to check health",
    });
  } catch (error) {
    throw error;
  }
}
