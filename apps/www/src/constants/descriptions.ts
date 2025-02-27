import { OrganizationRole } from "@/types/enums";

interface RoleDescription {
  title: string;
  description: string;
}

export const ORGANIZATION_ROLE_DESCRIPTIONS: Record<
  OrganizationRole,
  RoleDescription
> = {
  [OrganizationRole.OWNER]: {
    title: "Owner",
    description:
      "Full control over the organization, including billing, settings, and member management.",
  },
  [OrganizationRole.ADMINISTRATOR]: {
    title: "Administrator",
    description:
      "Can manage billing, organization settings, and team members, but cannot delete the organization.",
  },
  [OrganizationRole.DEVELOPER]: {
    title: "Developer",
    description:
      "Can manage API keys and view dashboard, but cannot modify organization settings.",
  },
};
