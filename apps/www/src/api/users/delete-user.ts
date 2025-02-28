import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";

/**
 * Delete a user
 *
 * @param userId - The ID of the user to delete
 * @returns A promise that resolves when the user is deleted
 * @throws Error if the deletion fails
 */
export async function deleteUser(userId: string): Promise<void> {
  try {
    return await makeApiRequest<void>(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      errorMessage: "Failed to delete user",
    });
  } catch (error) {
    throw error;
  }
}
