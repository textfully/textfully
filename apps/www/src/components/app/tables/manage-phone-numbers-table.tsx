import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PhoneNumberText } from "@/components/app/phone-number-text";
import { Skeleton } from "@/components/ui/skeleton";

// TODO: update this after endpoint is implemented
export interface PhoneNumber {
  id: string;
  phoneNumber: string;
  status: "active" | "inactive" | "pending";
}

export const ManagePhoneNumbersTableHeader = () => {
  return (
    <TableRow>
      <TableHead>Phone Number</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  );
};

export const ManagePhoneNumbersTableRow = ({
  phoneNumber,
}: {
  phoneNumber: PhoneNumber;
}) => {
  return (
    <TableRow>
      <TableCell className="w-56">
        <PhoneNumberText phoneNumber={phoneNumber.phoneNumber} />
      </TableCell>
      <TableCell className="flex-1">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            phoneNumber.status === "active"
              ? "bg-green-500/10 text-green-500"
              : phoneNumber.status === "inactive"
                ? "bg-red-500/10 text-red-500"
                : "bg-yellow-500/10 text-yellow-500"
          }`}
        >
          {phoneNumber.status.charAt(0).toUpperCase() +
            phoneNumber.status.slice(1)}
        </span>
      </TableCell>
    </TableRow>
  );
};

export const ManagePhoneNumbersTableHeaderSkeleton = () => {
  return (
    <TableRow>
      <TableHead className="w-56">
        <Skeleton className="h-4 w-32" />
      </TableHead>
      <TableHead className="flex-1">
        <Skeleton className="h-4 w-24" />
      </TableHead>
    </TableRow>
  );
};

export const ManagePhoneNumbersTableBodySkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="w-56">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="flex-1">
            <Skeleton className="h-4 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const ManagePhoneNumbersTableBodyEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={4} className="text-center text-zinc-400">
        No phone numbers found. Buy a number to get started.
      </TableCell>
    </TableRow>
  );
};

export const ManagePhoneNumbersTable = ({
  phoneNumbers,
  isLoading,
}: {
  phoneNumbers: PhoneNumber[];
  isLoading?: boolean;
}) => {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          {isLoading ? (
            <ManagePhoneNumbersTableHeaderSkeleton />
          ) : (
            <ManagePhoneNumbersTableHeader />
          )}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <ManagePhoneNumbersTableBodySkeleton />
          ) : !phoneNumbers?.length ? (
            <ManagePhoneNumbersTableBodyEmpty />
          ) : (
            phoneNumbers.map((phoneNumber) => (
              <ManagePhoneNumbersTableRow
                key={phoneNumber.phoneNumber}
                phoneNumber={phoneNumber}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
