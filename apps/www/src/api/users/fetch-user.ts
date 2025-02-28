import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

import { UserResponse } from "@/types/responses";

/**
 * Fetch a single user by ID
 *
 * @param id The user ID to fetch
 * @returns A promise that resolves to a user
 * @throws Error if the fetch fails
 */
export async function fetchUserById(id: string): Promise<UserResponse> {
  try {
    return await makeApiRequest<UserResponse>(`${API_BASE_URL}/users/${id}`, {
      errorMessage: "Failed to fetch user",
    });
  } catch (error) {
    throw error;
  }
}
