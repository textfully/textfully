import { AppProvider } from "@/contexts/useAppContext";
import { AuthProvider } from "@/contexts/useAuthContext";

import type { FC, PropsWithChildren } from "react";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
};
