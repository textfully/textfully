"use client";

import { useEffect, useState } from "react";
import constate from "constate";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { logError } from "@/utils/logger";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    fetchUser();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      logError("Error fetching user:", error);
    }
    setUser(data.user || null);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      logError("Error signing out:", error);
    } else {
      setUser(null);
      router.push("/login");
    }
  };

  return {
    user,
    loading,
    signOut,
  };
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
