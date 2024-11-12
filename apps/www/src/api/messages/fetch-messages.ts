import { API_BASE_URL } from "@/constants/env";
import { getAuthToken } from "@/utils/api-client";
import { MessageResponse } from "@/types/responses";

export async function fetchMessages(): Promise<MessageResponse[]> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch messages");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
