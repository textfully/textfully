"use client";

import { useEffect, useState } from "react";
import constate from "constate";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { logError } from "@/utils/logger";
import { toast } from "sonner";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword || undefined,
        });

        if (data) {
          toast.success("Your password has been updated.");
          
        }
        if (error) {
          toast.error("We encountered an error updating your password.");
        }
      } else {
        setUser(session?.user || null);
      }
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
    fetchUser,
    signOut,
  };
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
