'use client';

import type { Metadata } from 'next';
import './globals.css';
import store from '@/redux/store';
import { Provider } from 'react-redux';

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
    <html lang='en'>
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
