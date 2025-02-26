import { createClient } from "@/lib/supabase/client";
import { getData } from "./storage";
import { createRedirectLink } from "./utils";

export async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token || null;
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

  if (!token) {
    if (window.location.pathname.startsWith("/dashboard")) {
      const currentPath = window.location.pathname;
      window.location.href = createRedirectLink("/login", currentPath);
    }
  }

  const {
    headers = {},
    errorMessage = "API request failed",
    ...rest
  } = options;

  const storedOrgId = getData("SELECTED_ORGANIZATION_ID");

  const requestHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(storedOrgId && { "X-Organization-ID": storedOrgId }),
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
