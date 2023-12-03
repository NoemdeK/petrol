'use client';

import type { Metadata } from 'next';
import './globals.css';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

const metadata: Metadata = {
  title: 'Diophalytics.io',
  description: 'Solving the data',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
        <Provider store={store}>
          <body>{children}</body>
        </Provider>
    </html>
  );
}
