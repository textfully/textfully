"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/utils/helper";

export default function BuyNumbersPage() {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/numbers/buy"));
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <div>Buy Numbers</div>;
}
