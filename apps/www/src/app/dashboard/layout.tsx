import { PageLayout } from "@/components/app/layouts/page-layout";
import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Dashboard | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Dashboard | Textfully",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageLayout>{children}</PageLayout>;
}
