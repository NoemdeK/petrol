import type { Metadata } from "next";
import "./globals.css";
import "@/styles/app.scss";
import store from "@/redux/store";
import AuthProvider from "./providers/Provider";
import { getServerSession } from "next-auth";
import Redux from "./providers/Redux";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/utils/auth";
import { ThemeProvider } from "./providers/theme-provider";
import LoadingModal from "@/components/LoadingModal";
import { DocumentView } from "@/components/DocumentView";
import EditFieldData from "@/components/EditFieldData";
import ExportRawData from "@/components/ExportRawData";
import CreateInvoice from "@/components/Invoicing/CreateInvoice";
import { PrimeReactProvider } from "primereact/api";
import InvoiceOverdue from "@/components/Invoicing/InvoiceOverdue";
import ReceiveInvoiceOverdue from "@/components/Invoicing/ReceiveInvoiceOverdue";
import CreatePricing from "@/components/pricing/CreatePricing";

export const metadata: Metadata = {
  title: "Diophalytics",
  description:
    "Solving the hardest data collection and verification challenges. Revolutionizes decision-making through the seamless integration and analysis of data",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <Redux>
          <PrimeReactProvider>
            <body className="no-scrollbar">
              <LoadingModal />
              <DocumentView />
              <EditFieldData />
              <ExportRawData />
              <CreateInvoice />
              <InvoiceOverdue />
              <ReceiveInvoiceOverdue />
              <CreatePricing />
              <Toaster />
              {children}
            </body>
          </PrimeReactProvider>
        </Redux>
      </AuthProvider>
    </html>
  );
}
