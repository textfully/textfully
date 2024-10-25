import clsx from 'clsx';
import { Inter } from 'next/font/google';

import { ContextProvider } from '@/providers/ContextProvider';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Textfully — SMS & iMessage for Developers',
  description: 'Textfully makes it easy for developers to send SMS and iMessage. Perfect for transactional and marketing messages at scale. Get started for free today.',
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
