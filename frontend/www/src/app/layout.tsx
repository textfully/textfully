import clsx from "clsx";
import { Inter } from "next/font/google";

import { ContextProvider } from "@/providers/ContextProvider";

import type { Metadata } from "next";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Textfully — The Open Source Twilio Alternative",
  description:
    "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
  icons: ["/favicon.ico"],
  openGraph: {
    title: "Textfully — The Open Source Twilio Alternative",
    description:
      "Textfully makes it easy for developers to send SMS & iMessage in one line of code. Ideal for sending transactional and marketing messages at scale. Get started today for free.",
    type: "website",
    locale: "en_US",
    url: "https://textfully.dev",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "font-inter min-h-screen antialiased",
          inter.variable
        )}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
