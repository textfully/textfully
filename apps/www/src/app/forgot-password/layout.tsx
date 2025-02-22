import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Forgot Password | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Forgot Password | Textfully",
  },
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
