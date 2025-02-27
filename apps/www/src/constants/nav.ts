import {
  Code,
  CreditCard,
  MessagesSquare,
  Phone,
  Settings,
  Users,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon?: React.FC<{ className?: string }>;
  children?: MenuChildItem[];
  path?: string;
}

interface MenuChildItem {
  label: string;
  path: string;
}

export interface SettingsLink {
  href: string;
  label: string;
}

export const additionalItems: MenuItem[] = [
  {
    path: "/dashboard/account/settings",
    label: "Account Settings",
  },
];

export const settingsLinks: SettingsLink[] = [
  {
    href: "/dashboard/settings/general",
    label: "General",
  },
  {
    href: "/dashboard/settings/team",
    label: "Team",
  },
  {
    href: "/dashboard/settings/integrations",
    label: "Integrations",
  },
];

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
    path: "/dashboard/settings/general",
  },
];
