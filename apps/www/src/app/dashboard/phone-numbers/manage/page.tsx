"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/useAuthContext";
import { createRedirectLink } from "@/lib/utils";
import {
  ManagePhoneNumbersTableHeader,
  ManagePhoneNumbersTableRow,
} from "@/components/app/tables/manage-phone-numbers-table";
import type { PhoneNumber } from "@/components/app/tables/manage-phone-numbers-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

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

  // This is example data - in a real app this would come from an API call
  const phoneNumbers: PhoneNumber[] = [
    {
      id: "1",
      phoneNumber: "+16178856037",
      status: "active",
    },
  ];

  return (
    <div className="container p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Phone Numbers</h1>
        <Link href="/dashboard/phone-numbers/buy">
          <Button variant="b&w">Buy Number</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <ManagePhoneNumbersTableHeader />
        </TableHeader>
        <TableBody>
          {phoneNumbers.map((phoneNumber) => (
            <ManagePhoneNumbersTableRow
              key={phoneNumber.id}
              phoneNumber={phoneNumber}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
