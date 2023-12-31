
import type { Metadata } from 'next';
import './globals.css';
import '@/styles/app.scss'
import store from '@/redux/store';
import AuthProvider from './providers/Provider';
import { getServerSession } from 'next-auth';
import Redux from './providers/Redux';
import { Toaster } from '@/components/ui/toaster';
import { authOptions } from '@/utils/auth';
import { ThemeProvider } from './providers/theme-provider';
import LoadingModal from '@/components/LoadingModal';

const metadata: Metadata = {
  title: 'Diophalytics.io',
  description: 'Solving the data',
}



export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  
  return (
    <html lang='en' suppressHydrationWarning>
      <AuthProvider>
        <Redux >
          <body>
          
            {children}
            <LoadingModal />
            
            <Toaster />
          </body>
        </Redux>
        </AuthProvider>

    </html>
  );
}
