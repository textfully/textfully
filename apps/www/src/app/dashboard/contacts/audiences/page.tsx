"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/lib/utils";

export default function ContactAudiencesPage() {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/contacts/audiences"));
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <div>Coming Soon...</div>;
}
