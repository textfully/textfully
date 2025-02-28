"use client";

import { useEffect, useState } from "react";
import constate from "constate";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { logError } from "@/lib/logger";
import { UserResponse } from "@/types/responses";
import { fetchUserById } from "@/api/users/fetch-user";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserResponse | null | undefined>(
    undefined
  );
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);

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

    if (data.user) {
      setIsLoadingUserInfo(true);
      try {
        setUser(data.user);
        const userInfo = await fetchUserById(data.user.id);
        setUserInfo(userInfo);
      } catch (error) {
        logError(`Error fetching user:`, error);
        setUser(null);
        setUserInfo(null);
      } finally {
        setIsLoadingUserInfo(false);
      }
    } else {
      setUser(null);
      setUserInfo(null);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      logError("Error signing out:", error);
    } else {
      setUser(null);
      setUserInfo(null);
      window.location.href = "/login";
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

  const signInWithOAuth = async (
    provider: "github" | "google",
    redirectTo?: string | null
  ) => {
    try {
      const callbackUrl = redirectTo
        ? `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`
        : `${window.location.origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl },
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
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    const callbackUrl = `${window.location.origin}/auth/callback?redirectTo=/reset-password`;

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: callbackUrl,
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
    userInfo,
    isLoadingUserInfo,
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
