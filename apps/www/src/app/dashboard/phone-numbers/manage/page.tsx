"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PhoneNumberText } from "@/components/app/phone-number-text";

export default function ManagePhoneNumbersPage() {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      redirect(createRedirectLink("/login", "/dashboard/phone-numbers/manage"));
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Phone Numbers</h1>
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 bg-zinc-900">
              <TableHead>Phone Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Daily Message Limit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-zinc-800">
              <TableCell className="min-w-48">
                <PhoneNumberText phoneNumber="+16178856037" />
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-400/20 text-zinc-400">
                  Free Plan
                </span>
              </TableCell>
              <TableCell>100 messages per day</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                  Active
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
