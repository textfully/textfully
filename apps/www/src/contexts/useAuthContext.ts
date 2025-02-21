"use client";

import { useEffect, useState } from "react";
import constate from "constate";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { logError } from "@/lib/logger";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

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
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signInWithOAuth = async (provider: "github" | "google") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  return {
    user,
    loading,
    signOut,
    signInWithPassword,
    signInWithOAuth,
    signUp,
    resetPasswordForEmail,
    updatePassword,
    supabase,
  };
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
