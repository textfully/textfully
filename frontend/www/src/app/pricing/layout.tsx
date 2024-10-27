import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Textfully",
  description:
    "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
  openGraph: {
    title: "Pricing | Textfully",
    description:
      "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
    images: [
      {
        url: "https://textfully.dev/banner.png",
        width: 600,
        height: 600,
        alt: "Textfully",
      },
    ],
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
