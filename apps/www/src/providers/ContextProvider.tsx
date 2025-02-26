import { AuthProvider } from "@/contexts/use-auth-context";
import { OrganizationProvider } from "@/contexts/use-organization-context";

import type { FC, PropsWithChildren } from "react";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <OrganizationProvider>{children}</OrganizationProvider>
    </AuthProvider>
  );
};
