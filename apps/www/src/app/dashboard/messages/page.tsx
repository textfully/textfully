import { redirect } from "next/navigation";

export default function MessagesPage() {
  redirect("/dashboard/messages/sent");
}
