import {
  Code,
  CreditCard,
  MessagesSquare,
  Phone,
  Settings,
  Users,
} from "lucide-react";

interface MenuItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  children?: MenuChildItem[];
  path?: string;
}

interface MenuChildItem {
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    icon: MessagesSquare,
    label: "Messages",
    children: [
      { label: "Sent messages", path: "/dashboard/messages/sent" },
      { label: "Scheduled messages", path: "/dashboard/messages/scheduled" },
      { label: "Message templates", path: "/dashboard/messages/templates" },
    ],
  },
  {
    icon: Users,
    label: "Contacts",
    children: [
      { label: "Contact list", path: "/dashboard/contacts/list" },
      { label: "Audiences/Groups", path: "/dashboard/contacts/audiences" },
      { label: "Import contacts", path: "/dashboard/contacts/import" },
    ],
  },
  {
    icon: Phone,
    label: "Phone Numbers",
    children: [
      { label: "Manage numbers", path: "/dashboard/phone-numbers/manage" },
      { label: "Buy new numbers", path: "/dashboard/phone-numbers/buy" },
    ],
  },
  {
    icon: Code,
    label: "API",
    children: [
      { label: "API keys", path: "/dashboard/api/keys" },
      { label: "SDK integration guides", path: "/docs/sdk" },
      { label: "API documentation", path: "/docs" },
    ],
  },
  {
    icon: CreditCard,
    label: "Billing",
    children: [
      { label: "Plan & usage", path: "/dashboard/billing/plan" },
      { label: "Payment methods", path: "/dashboard/billing/payment" },
      { label: "Invoices", path: "/dashboard/billing/invoices" },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    children: [
      { label: "General", path: "/dashboard/settings/general" },
      { label: "Team", path: "/dashboard/settings/team" },
      { label: "Integrations", path: "/dashboard/settings/integrations" },
    ],
  },
];
