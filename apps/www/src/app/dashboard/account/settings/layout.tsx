import type { Metadata } from "next";
import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import { PageLayout } from "@/components/app/page-layout";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Account Settings | Textfully",
  openGraph: {
    ...defaultOpenGraph,
    title: "Account Settings | Textfully",
  },
};

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
