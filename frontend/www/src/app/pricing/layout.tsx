import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Textfully",
  description:
    "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
  icons: ["/favicon.ico"],
  openGraph: {
    title: "Pricing | Textfully",
    description:
      "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
    type: "website",
    locale: "en_US",
    url: "https://textfully.dev",
    images: [
      {
        url: "https://textfully.dev/logo.png",
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
