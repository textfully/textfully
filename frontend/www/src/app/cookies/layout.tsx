import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Cookie Policy | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Cookie Policy | Textfully",
  },
};

export default function CookiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
