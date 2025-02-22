import { createClient } from "@/lib/supabase/client";
import { getData } from "./storage";

export async function getAuthToken(): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Failed to get auth token");
  }

  if (!session?.access_token) {
    throw new Error("No auth token found");
  }

  return session.access_token;
}

interface RequestOptions extends RequestInit {
  organizationId?: string;
  errorMessage?: string;
}

export async function makeApiRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = await getAuthToken();
  const {
    headers = {},
    errorMessage = "API request failed",
    ...rest
  } = options;

  const storedOrg = getData("SELECTED_ORGANIZATION");
  const selectedOrg = storedOrg ? JSON.parse(storedOrg) : null;

  const requestHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(selectedOrg && { "X-Organization-ID": selectedOrg.id }),
    ...headers,
  };

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || errorMessage);
  }

  if (response.status === 204) {
    return null as unknown as T;
  } else {
    return response.json();
  }
}
