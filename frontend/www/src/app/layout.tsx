import clsx from "clsx";
import { Inter } from "next/font/google";

import { ContextProvider } from "@/providers/ContextProvider";

import type { Metadata } from "next";
import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";

import "@/styles/globals.css";
import "@/styles/bubbles.css";
import "@/styles/masks.css";
import "@/styles/fonts.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: ["/favicon.ico"],
  openGraph: {
    ...defaultOpenGraph,
    type: "website",
    locale: "en_US",
    url: "https://textfully.dev",
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
          "font-inter min-h-screen antialiased bg-zinc-950 text-white",
          inter.variable
        )}
      >
        <ContextProvider>{children}</ContextProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
