import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Reset Password | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Reset Password | Textfully",
  },
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
