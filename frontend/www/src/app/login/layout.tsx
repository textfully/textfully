import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Login | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Login | Textfully",
  },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
