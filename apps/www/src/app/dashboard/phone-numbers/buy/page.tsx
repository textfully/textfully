"use client";

import { useAuthContext } from "@/contexts/use-auth-context";

export default function BuyPhoneNumbersPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <div>Coming Soon...</div>;
}
