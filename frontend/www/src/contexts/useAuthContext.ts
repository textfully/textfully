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
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
