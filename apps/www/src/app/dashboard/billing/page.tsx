import { redirect } from "next/navigation";

export default function BillingPage() {
  redirect("/dashboard/billing/plan");
}
