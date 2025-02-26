import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { MessageResponse } from "@/types/responses";

/**
 * Fetch all messages
 *
 * @returns A promise that resolves to an array of messages
 * @throws Error if the fetch fails
 */
export async function fetchMessages(): Promise<MessageResponse[]> {
  try {
    return await makeApiRequest<MessageResponse[]>(`${API_BASE_URL}/messages`, {
      errorMessage: "Failed to fetch messages",
    });
  } catch (error) {
    throw error;
  }
}
