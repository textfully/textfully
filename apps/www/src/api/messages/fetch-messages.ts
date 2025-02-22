import { API_BASE_URL } from "@/constants/env";
import { makeApiRequest } from "@/lib/api-client";
import { MessageResponse } from "@/types/responses";

export async function fetchMessages(): Promise<MessageResponse[]> {
  try {
    return await makeApiRequest<MessageResponse[]>(`${API_BASE_URL}/messages`, {
      errorMessage: "Failed to fetch messages",
    });
  } catch (error) {
    throw error;
  }
}
