"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/utils/helper";

export default function MessageTemplatesPage() {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/messages/templates"));
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <div>Message Templates</div>;
}
