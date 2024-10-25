import clsx from 'clsx';
import { Inter } from 'next/font/google';

import { ContextProvider } from '@/providers/ContextProvider';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'The Truth Web App',
  description: 'SaaS base app for Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx('font-inter min-h-screen antialiased', inter.variable)}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
