import { createClient } from "./supabase/client";

export async function getAuthToken(): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error("No authentication session");
  }

  return session.access_token;
}
