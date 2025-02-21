import { createClient } from "@/lib/supabase/client";

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
    organizationId,
    headers = {},
    errorMessage = "API request failed",
    ...rest
  } = options;

  const requestHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(organizationId && { "X-Organization-ID": organizationId }),
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

  return response.json();
}
