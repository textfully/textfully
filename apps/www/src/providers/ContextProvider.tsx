import { AppProvider } from "@/contexts/useAppContext";
import { AuthProvider } from "@/contexts/useAuthContext";
import { OrganizationProvider } from "@/contexts/useOrganizationContext";

import type { FC, PropsWithChildren } from "react";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </AuthProvider>
    </AppProvider>
  );
};
