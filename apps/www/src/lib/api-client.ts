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
